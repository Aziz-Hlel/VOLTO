import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntityType, Event, EventType, MediaPurpose, Prisma } from '@prisma/client';
import { MediaService } from 'src/media/media.service';
import { PrismaService } from 'src/prisma/prisma.service';
import Redis from 'ioredis';
import { REDIS_HASHES } from 'src/redis/hashes';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { GetAllEventsDto } from './dto/get-all-events';
import { GetEventsPageDto } from './dto/get-evets-page.dto';
import { SpecialEventMq } from 'src/bullmq/specialEventsMq.service';
import { WeeklyEventMq } from 'src/bullmq/weeklyEventsMq.service';
import cronParser from 'cron-parser';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private readonly mediaService: MediaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly specialEventsMq: SpecialEventMq,
    private readonly weeklyEventsMq: WeeklyEventMq,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const { thumbnail, video, ...eventDto } = createEventDto;
    try {
      await this.prisma.$transaction(async (tx) => {
        const createdEvent: Event = await tx.event.create({
          data: {
            ...eventDto,
            isLadiesNight: false,
          },
        });

        const confirmThumbnail = this.mediaService.confirmPendingMedia(
          thumbnail.s3Key,
          createdEvent.id,
        );

        const confirmVideo = this.mediaService.confirmPendingMedia(video.s3Key, createdEvent.id);
        await Promise.all([confirmThumbnail, confirmVideo]);

        if (createdEvent.type === EventType.SPECIAL) {
          await this.specialEventsMq.addSpecialEventNotification({
            eventId: createdEvent.id,
            eventName: createdEvent.name,
            startDate: new Date(new Date().getTime() + 10 * 1000)!,
            endDate: createdEvent.endDate!,
          });
        }

        return createdEvent;
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error creating event');
    }
  }

  async getById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) throw new NotFoundException(`Event with ID ${id} not found`);

    const thumbnail = await this.mediaService.getMediaKeyAndUrl({
      entityType: EntityType.EVENT,
      entityId: event.id,
      mediaPurpose: MediaPurpose.THUMBNAIL,
    });

    const video = await this.mediaService.getMediaKeyAndUrl({
      entityType: EntityType.EVENT,
      entityId: event.id,
      mediaPurpose: MediaPurpose.VIDEO,
    });

    return { ...event, thumbnail, video };
  }

  async findAll(query: GetAllEventsDto) {
    const events = await this.prisma.event.findMany({
      where: {
        type: query.eventType,
      },
    });

    const eventWithMedia = events.map(async (event) => {
      const thumbnail = await this.mediaService.getMediaKeyAndUrl({
        entityType: EntityType.EVENT,
        entityId: event.id,
        mediaPurpose: MediaPurpose.THUMBNAIL,
      });

      const video = await this.mediaService.getMediaKeyAndUrl({
        entityType: EntityType.EVENT,
        entityId: event.id,
        mediaPurpose: MediaPurpose.VIDEO,
      });

      return { ...event, thumbnail, video };
    });

    return Promise.all(eventWithMedia);
  }

  async findPage(query: GetEventsPageDto) {
    const galleries = this.prisma.event.findMany({
      skip: (query.page - 1) * query.limit,
      take: query.limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = this.prisma.event.count({});

    const [response, count] = await this.prisma.$transaction([galleries, total]);

    const eventsWithMedia = response.map(async (gallery) => {
      const thumbnail = await this.mediaService.getMediaKeyAndUrl({
        entityType: EntityType.EVENT,
        entityId: gallery.id,
        mediaPurpose: MediaPurpose.THUMBNAIL,
      });

      const video = await this.mediaService.getMediaKeyAndUrl({
        entityType: EntityType.EVENT,
        entityId: gallery.id,
        mediaPurpose: MediaPurpose.VIDEO,
      });

      return { ...gallery, thumbnail, video };
    });

    const galleriesWithMedia = await Promise.all(eventsWithMedia);

    return {
      payload: galleriesWithMedia,
      count,
    };
  }

  update = async (updateEventDto: UpdateEventDto) => {
    const { thumbnail, video, ...eventDto } = updateEventDto;

    const existingEvent = await this.getById(updateEventDto.id);

    if (!existingEvent) throw new Error(`Event with ID ${updateEventDto.id} not found`);

    return this.prisma.$transaction(async (tx) => {
      if (existingEvent.thumbnail.s3Key !== thumbnail.s3Key) {
        await this.mediaService.updateEntityMedia({
          entityId: updateEventDto.id,
          entityType: EntityType.EVENT,
          mediaPurpose: MediaPurpose.THUMBNAIL,
          newMediaS3Key: updateEventDto.thumbnail.s3Key,
        });
      }
      if (existingEvent.video.s3Key !== video.s3Key) {
        await this.mediaService.updateEntityMedia({
          entityId: updateEventDto.id,
          entityType: EntityType.EVENT,
          mediaPurpose: MediaPurpose.VIDEO,
          newMediaS3Key: updateEventDto.video.s3Key,
        });
      }

      const updatedEvent: Event = await this.prisma.event.update({
        where: { id: updateEventDto.id },
        data: {
          ...eventDto,
        },
      });

      if (
        existingEvent.type === 'WEEKLY' &&
        existingEvent.cronStartDate !== updatedEvent.cronStartDate
      ) {
        await this.weeklyEventsMq.removeWeeklyEventNotification(existingEvent.id);
      }

      if (existingEvent.type === 'SPECIAL' && existingEvent.startDate !== updatedEvent.startDate) {
        await this.specialEventsMq.removeSpecialEventNotification(existingEvent.id);
      }

      if (updatedEvent.type === 'WEEKLY') {
        const newEventJobParams = {
          eventId: updatedEvent.id,
          eventName: updatedEvent.name,
          cronStartDate: updatedEvent.cronStartDate!,
          cronEndDate: updatedEvent.cronEndDate!,
          isLadiesNight: updatedEvent.isLadiesNight,
        };
        await this.weeklyEventsMq.addWeeklyEventNotification(newEventJobParams);
      } else {
        const newEventJobParams = {
          eventId: updatedEvent.id,
          eventName: updatedEvent.name,
          startDate: updatedEvent.startDate!,
          endDate: updatedEvent.endDate!,
        };
        await this.specialEventsMq.addSpecialEventNotification(newEventJobParams);
      }

      if (existingEvent.isLadiesNight) {
        await this.redis.del(REDIS_HASHES.LADIES_NIGHT.DATE.HASH());
      }

      if (
        existingEvent.isLadiesNight &&
        (existingEvent.cronStartDate !== updatedEvent.cronStartDate ||
          existingEvent.cronEndDate !== updatedEvent.cronEndDate)
      ) {
        await this.deleteUserHashes();
      }

      return updatedEvent;
    });
  };

  async deleteUserHashes() {
    const pattern = REDIS_HASHES.LADIES_NIGHT.USER.ALL_HASHES();
    let cursor = '0';

    do {
      const [newCursor, keys] = await this.redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
      cursor = newCursor;

      if (keys.length > 0) {
        await this.redis.del(...keys); // delete all found keys
      }
    } while (cursor !== '0');
  }

  async remove(eventId: string) {
    return this.prisma.$transaction(async (tx) => {
      try {
        const event = await this.prisma.event.findUnique({
          where: {
            id: eventId,
          },
        });

        if (!event) {
          throw new NotFoundException(`Event with ID ${eventId} not found`);
        }

        if (event.isLadiesNight) {
          throw new BadRequestException('Cannot delete ladies night event');
        }

        const deleteEvent = this.prisma.event.delete({
          where: {
            id: eventId,
          },
        });

        const deleteAssociatedMedias = this.mediaService.removeMany({
          entityId: eventId,
          entityType: EntityType.EVENT,
        });

        await Promise.all([deleteEvent, deleteAssociatedMedias]);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
          throw new NotFoundException(`Event with ID ${eventId} not found`);
        }
        throw e;
      }
    });
  }

  async getLadiesNight() {
    const ladiesNight = await this.prisma.event.findFirst({
      where: {
        isLadiesNight: true,
      },
    });

    return ladiesNight;
  }

  async getClosestWeeklyEvent() {
    const now = new Date();

    const allWeeklyEvents = await this.prisma.event.findMany({
      where: {
        type: EventType.WEEKLY,
      },
      orderBy: {
        cronStartDate: 'asc', // earliest first
      },
    });

    const withNextDates = allWeeklyEvents
      .map((event) => {
        try {
          const cronStartDateInterval = cronParser.parse(event.cronStartDate!, {
            currentDate: now,
          });
          const cronEndDateInterval = cronParser.parse(event.cronEndDate!, {
            currentDate: now,
          });
          const nextCronStartDate = cronStartDateInterval.next().toDate();
          const nextCronEndDate = cronEndDateInterval.next().toDate();

          return {
            ...event,
            nextExecution: {
              nextCronStartDate,
              nextCronEndDate,
            },
          };
        } catch (err) {
          console.error(`Invalid cron expression for event ${event.id}:`, err);
          return null;
        }
      })
      .filter(Boolean);

    const sorted = withNextDates.sort(
      (a, b) =>
        (a as any)?.nextExecution?.nextCronEndDate.getTime() -
        (b as any)?.nextExecution?.nextCronEndDate.getTime(),
    );

    const chosenEvent = sorted[0];

    if (
      chosenEvent?.nextExecution?.nextCronStartDate &&
      chosenEvent?.nextExecution?.nextCronEndDate &&
      chosenEvent?.nextExecution?.nextCronStartDate?.getTime() >
        chosenEvent?.nextExecution?.nextCronEndDate?.getTime()
    ) {
      const cronStartDateInterval = cronParser.parse(chosenEvent.cronStartDate!, {
        currentDate: now,
      });
      const nextCronStartDate = cronStartDateInterval.prev().toDate();

      chosenEvent.nextExecution.nextCronStartDate = nextCronStartDate;
    }
    return {
      eventTitle: sorted[0]?.name,
      eventStartDate: sorted[0]?.nextExecution?.nextCronStartDate,
      eventEndDate: sorted[0]?.nextExecution?.nextCronEndDate,
    };
  }

  async getClosestEvent() {
    const now = new Date();

    const closestActiveOrUpcomingSpecialEvents = await this.prisma.event.findFirst({
      where: {
        endDate: { gt: now }, // filter out events that already ended
        type: EventType.SPECIAL,
      },
      orderBy: {
        startDate: 'asc', // earliest first
      },
    });

    if (!closestActiveOrUpcomingSpecialEvents) {
      return this.getClosestWeeklyEvent();
    }
    const diffInMs = closestActiveOrUpcomingSpecialEvents.startDate!.getTime() - now.getTime();
    const specialEventInLessThanWeek = diffInMs / (1000 * 60 * 60 * 24) <= 7;

    if (specialEventInLessThanWeek) {
      return {
        eventTitle: closestActiveOrUpcomingSpecialEvents.name,
        eventStartDate: closestActiveOrUpcomingSpecialEvents.startDate,
        eventEndDate: closestActiveOrUpcomingSpecialEvents.endDate,
      };
    }

    return this.getClosestWeeklyEvent();
  }
}

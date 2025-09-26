import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityType, Event, MediaPurpose, Prisma } from '@prisma/client';
import { MediaService } from 'src/media/media.service';
import { PrismaService } from 'src/prisma/prisma.service';
import Redis from 'ioredis';
import { HASHES } from 'src/redis/hashes';
import { GetAllEventsDto } from './dto/get-all-events';
import { GetEventsPageDto } from './dto/get-evets-page.dto';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private readonly mediaService: MediaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const { thumbnail, video, ...eventDto } = createEventDto;

    const createdEvent: Event = await this.prisma.event.create({
      data: {
        ...eventDto,
        isLadiesNight: false,
      },
    });

    try {

      const confirmThumbnail = this.mediaService.confirmPendingMedia(
        thumbnail.s3Key,
        createdEvent.id,
      );
      const confirmVideo = this.mediaService.confirmPendingMedia(
        video.s3Key,
        createdEvent.id,
      );
      await Promise.all([confirmThumbnail, confirmVideo]);

    } catch (e) {
      await this.prisma.event.delete({ where: { id: createdEvent.id } });
      throw new BadRequestException(e.message);
    }


    return createdEvent;
  }

  async getById(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
    });

    if (!event) throw new Error(`Event with ID ${id} not found`);

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
        createdAt: 'desc'
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
      count
    }


  }

  update = async (updateEventDto: UpdateEventDto) => {

    const { thumbnail, video, ...eventDto } = updateEventDto;

    const existingEvent = await this.getById(updateEventDto.id);

    if (!existingEvent)
      throw new Error(`Event with ID ${updateEventDto.id} not found`);

    return await this.prisma.$transaction(async (tx) => {

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

      if (existingEvent.isLadiesNight) {
        await this.redis.del(HASHES.LADIES_NIGHT.DATE.HASH());
      }

      if (existingEvent.isLadiesNight && (existingEvent.cronStartDate !== updatedEvent.cronStartDate || existingEvent.cronEndDate !== updatedEvent.cronEndDate)) {
        await this.deleteUserHashes();
      }

      return updatedEvent;

    });

  };


  async deleteUserHashes() {
    const pattern = HASHES.LADIES_NIGHT.USER.ALL_HASH();
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

    return await this.prisma.$transaction(async (tx) => {

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

        const deleteAssociatedMedias = this.mediaService.removeMany({ entityId: eventId, entityType: EntityType.EVENT });

        await Promise.all([deleteEvent, deleteAssociatedMedias]);

      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
          throw new NotFoundException(`Event with ID ${eventId} not found`);
        }
        throw e;
      }
    })



  }
}

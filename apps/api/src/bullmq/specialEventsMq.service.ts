import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import ENV from 'src/config/env';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonEventsMqService } from './CommonEventsMq.service';

interface IAddSpecialEvent {
  eventId: string;
  eventName: string;
  startDate: Date;
  endDate: Date;
}

interface SpecialEventJobData {
  eventId: string;
  eventName: string;
  startDate: string;
  endDate: string;
  delay: 'firstDelay' | 'secondDelay';
}

@Injectable()
export class SpecialEventMq implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SpecialEventMq.name);

  private readonly queueName = 'specialEvents-scheduler';
  private eventQueue: Queue<SpecialEventJobData>;

  private eventWorker: Worker<SpecialEventJobData>;

  private readonly _hour = 1000 * 60 * 60;
  private readonly firstNotificationDelay = 0  // ! this._hour * 24;
  private readonly secondNotificationDelay = 1000 * 60 // ! this._hour * 1;

  private readonly oneSignalUrl = 'https://api.onesignal.com/notifications';

  public constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly commonEventsMq: CommonEventsMqService,
  ) {}

  private async processSendSpecialEventsNotification(job: Job<SpecialEventJobData>) {
    const headings = this.commonEventsMq.getNotifcationHeadings({
      delay: job.data.delay,
      eventName: job.data.eventName,
    });

    const content = this.commonEventsMq.getNotificationContent({ delay: job.data.delay });

    const notificationPayload = {
      app_id: ENV.ONE_SIGNAL_APP_ID,
      target_channel: 'push',
      headings: headings,
      included_segments: ['All'],
      data: { screen: 'event' },
      contents: content,
    };

    try {
      await axios.post(this.oneSignalUrl, notificationPayload, {
        headers: {
          Authorization: `Bearer ${ENV.ONE_SIGNAL_APP_SECRET}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      this.logger.error(`❌ Notification job failed: ${error.message}`);
    }

    console.log(
      'Notification started Now for special event : ',
      job.data.eventName,
      '\n\tEvents starts in : ',
      (new Date(job.data.startDate).getTime() - Date.now()) / 1000,
      ' sec',
    );
  }

  private initQueue() {
    this.eventQueue = new Queue<SpecialEventJobData>(this.queueName, {
      connection: this.redis,
      defaultJobOptions: {
        removeOnComplete: 50, // Keep last 50 completed jobs for monitoring
        removeOnFail: 100, // Keep last 100 failed jobs for debugging
        attempts: 3, // Retry failed jobs up to 3 times
        backoff: {
          type: 'exponential',
          delay: 5000, // Start with 5 second delay
        },
      },
    });

    this.eventQueue.on('waiting', (job) => {
      this.logger.log(
        `📥 Job ${job.data.eventId} ${job.data.eventName} has been created and is waiting`,
      );
    });
  }

  private initWorker() {
    this.eventWorker = new Worker<SpecialEventJobData>(
      this.queueName,
      async (job: Job<SpecialEventJobData>) => await this.processSendSpecialEventsNotification(job),
      {
        connection: this.redis,
        concurrency: 2,
      },
    );

    this.eventWorker.on('completed', (job) => {
      this.logger.log(`✅ Event job completed: ${job.data.eventName} in Queue ${this.queueName}`);
    });

    this.eventWorker.on('failed', (job, err) => {
      this.logger.error(
        `❌ Event job failed: ${job?.data?.eventName} - ${err.message} in Queue ${this.queueName}`,
      );
    });

    this.eventWorker.on('error', (err) => {
      this.logger.error('BullMQ Worker error:', err);
    });
  }

  getJobId(eventId: string, delay: 'firstDelay' | 'secondDelay') {
    return `${eventId}-${delay}`;
  }

  async addSpecialEventNotification(data: IAddSpecialEvent) {
    this.logger.log('t5lt bech iadi');
    console.log('diraabk l date : ',data.startDate.toUTCString())
    const delayInMs = data.startDate.getTime() - Date.now();
    const firstDelay = delayInMs - this.firstNotificationDelay;
    const secondDelay = delayInMs - this.secondNotificationDelay;

    if (firstDelay > 0) {
      const jobId = this.getJobId(data.eventId, 'firstDelay');
      const eventJobPayload: SpecialEventJobData = {
        eventId: data.eventId,
        eventName: data.eventName,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        delay: 'firstDelay',
      };
      await this.eventQueue.add(data.eventId, eventJobPayload, { jobId: jobId, delay: firstDelay });
    }

    if (secondDelay > 0) {
      const jobId = this.getJobId(data.eventId, 'secondDelay');
      const eventJobPayload: SpecialEventJobData = {
        eventId: data.eventId,
        eventName: data.eventName,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        delay: 'secondDelay',
      };
      await this.eventQueue.add(data.eventId, eventJobPayload, {
        jobId: jobId,
        delay: secondDelay,
      });
    }
  }

  async removeSpecialEventNotification(eventId: string) {
    const firstDelayJobId = this.getJobId(eventId, 'firstDelay');
    const secondDelayJobId = this.getJobId(eventId, 'secondDelay');

    const firstDelayJob = await this.eventQueue.getJob(firstDelayJobId);
    const secondDelayJob = await this.eventQueue.getJob(secondDelayJobId);

    await firstDelayJob?.remove();
    await secondDelayJob?.remove();
  }

  async onModuleInit() {
    this.initQueue();
    this.initWorker();

    const jobSchedulers = await this.eventQueue.getJobSchedulers();

    this.logger.log(`Found ${jobSchedulers.length} job schedulers in ${this.queueName}`);
  }

  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }
}

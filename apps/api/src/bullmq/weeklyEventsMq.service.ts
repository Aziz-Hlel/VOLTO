import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import ENV from 'src/config/env';
import { PrismaService } from 'src/prisma/prisma.service';

interface IAddWeeklyEvent {
  eventId: string;
  eventName: string;
  cronStartDate: string;
  cronEndDate: string;
}

interface WeeklyEventJobData {
  eventId: string;
  eventName: string;
  cronStartDate: string;
  cronEndDate: string;
}

@Injectable()
export class WeeklyEventMq implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(WeeklyEventMq.name);

  private readonly queueName = 'weeklyEvents-scheduler';
  private eventQueue: Queue<WeeklyEventJobData>;

  private eventWorker: Worker<WeeklyEventJobData>;

  private readonly _hour = 1000 * 60 * 60;
  private readonly firstNotificationDelay = 0; // !this._hour * 24;
  private readonly secondNotificationDelay = 0; // !this._hour * 2;

    private readonly oneSignalUrl = 'https://api.onesignal.com/notifications';

    
  public constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  private async  processSendSpecialEventsNotification(job: Job<WeeklyEventJobData>) {
        const notificationPayload = {
      app_id: ENV.ONE_SIGNAL_APP_ID,
      target_channel: 'push',
      headings: {
        en: job.data.eventName,
      },
      included_segments: ['All'],
      data: { screen: 'event' },
      contents: {
        en: 'Event starts in 24 hours',
      },
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
      'Notification started Now for weekly event : ',
      job.data.eventName,
      '\n\tEvents starts in : ',
      job.data.cronStartDate,
      ' sec',
    );
  }

  private initQueue() {
    this.eventQueue = new Queue<WeeklyEventJobData>(this.queueName, {
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
    this.eventWorker = new Worker<WeeklyEventJobData>(
      this.queueName,
      async (job: Job<WeeklyEventJobData>) => await this.processSendSpecialEventsNotification(job),
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

  async addWeeklyEventNotification(data: IAddWeeklyEvent) {
    const jobId = this.getJobId(data.eventId, 'firstDelay');

    const eventJobPayload: WeeklyEventJobData = {
      eventId: data.eventId,
      eventName: data.eventName,
      cronStartDate: data.cronStartDate,
      cronEndDate: data.cronEndDate,
    };
    console.log('adding weekly event with param : ', {
      jobId: jobId,
      eventId: data.eventId,
      eventName: data.eventName,
      cronStartDate: data.cronStartDate,
      cronEndDate: data.cronEndDate,
    });

    await this.eventQueue.add(
      jobId, // name of the job
      eventJobPayload, // payload
      {
        repeat: {
          pattern: data.cronStartDate, // <-- cron expression here
          tz: 'utc', // optional: timezone
        },
        repeatJobKey: jobId,
      },
    );

    // const delayInMs = data.cronStartDate.getTime() - Date.now();
    // const firstDelay = delayInMs - this.firstNotificationDelay;
    // const secondDelay = delayInMs - 2000 - this.secondNotificationDelay;

    // if (firstDelay > 0) {
    //   const jobId = this.getJobId(data.eventId, 'firstDelay');
    //   const eventJobPayload: WeeklyEventJobData = {
    //     eventId: data.eventId,
    //     eventName: data.eventName,
    //     cronStartDate: data.cronStartDate,
    //     cronEndDate: data.cronEndDate,
    //   };
    //   await this.eventQueue.add(
    //     data.eventId, // name of the job
    //     eventJobPayload, // payload
    //     {
    //       jobId: jobId, // optional, keeps the same job from duplicating
    //       repeat: {
    //         pattern: data.cronStartDate, // <-- cron expression here
    //         tz: 'utc', // optional: timezone
    //       },
    //     },
    //   );
    // }

    // if (secondDelay > 0) {
    //   const jobId = this.getJobId(data.eventId, 'secondDelay');
    //   const eventJobPayload: WeeklyEventJobData = {
    //     eventId: data.eventId,
    //     eventName: data.eventName,
    //     cronStartDate: data.cronStartDate.toISOString(),
    //     cronEndDate: data.cronEndDate.toISOString(),
    //   };
    //   await this.eventQueue.add(data.eventId, eventJobPayload, {
    //     jobId: jobId,
    //     delay: secondDelay,
    //   });
    // }
  }

  async removeWeeklyEventNotification(eventId: string) {
    const firstDelayJobId = this.getJobId(eventId, 'firstDelay');
    const secondDelayJobId = this.getJobId(eventId, 'secondDelay');

    const allJobSchedulers = await this.eventQueue.getJobSchedulers();

    allJobSchedulers.map((scheduler) => {
      scheduler.name === firstDelayJobId && this.eventQueue.removeJobScheduler(scheduler.key);
    });

    allJobSchedulers.map((scheduler) => {
      scheduler.name === secondDelayJobId && this.eventQueue.removeJobScheduler(scheduler.key);
    });

    // await this.eventQueue.removeJobScheduler(secondDelayJobId);
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

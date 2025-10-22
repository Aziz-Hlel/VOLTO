import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import ENV from 'src/config/env';
import { CommonEventsMqService } from './CommonEventsMq.service';

export interface IAddSpecialEvent {
  eventId: string;
  eventName: string;
  startDate: Date;
  endDate: Date;
}

export interface SpecialEventJobData {
  eventId: string;
  eventName: string;
  startDate: string;
  endDate: string;
  delay: 'firstDelay' | 'secondDelay';
  isSpinningWheelEvent?: boolean;
}

@Injectable()
export class SpecialEventMq implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SpecialEventMq.name);

  private readonly queueName = 'specialEvents-scheduler';
  private eventQueue: Queue<SpecialEventJobData>;

  private eventWorker: Worker<SpecialEventJobData>;

  private readonly _hour = 1000 * 60 * 60;
  private readonly firstNotificationDelay = this._hour * 24;
  private readonly secondNotificationDelay = this._hour * 1;

  private readonly oneSignalUrl = 'https://api.onesignal.com/notifications';

  public constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly commonEventsMq: CommonEventsMqService,
  ) {}

  private async processSendSpecialEventsNotification(job: Job<SpecialEventJobData>) {
    this.logger.debug(
      `Job started for Special Event : ${job.data.eventName} in Queue ${this.queueName}`,
    );

    const now = Date.now();
    const maxDelay = 5 * 60 * 1000; // 1 minute tolerance
    const scheduledAt = job.timestamp;

    if (scheduledAt - now > maxDelay) {
      this.logger.warn(
        `Job for Special Event : ${job.data.eventName} is running late. Scheduled at ${new Date(
          scheduledAt,
        ).toISOString()}, now is ${new Date(now).toISOString()} \n\t Canceling notification to avoid confusion.`,
      );
      return;
    }
    const headings = this.commonEventsMq.getNotifcationHeadings({
      delay: job.data.delay,
      eventName: job.data.eventName,
    });

    const content = this.commonEventsMq.getNotificationContent({ delay: job.data.delay });

    const mobilePath = { screen: job.data.isSpinningWheelEvent ? 'spinning-wheel' : 'event' };

    const notificationPayload = {
      app_id: ENV.ONE_SIGNAL_APP_ID,
      target_channel: 'push',
      headings: headings,
      included_segments: ['All'],
      data: mobilePath,
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
      const now = Date.now();

      const delay = job.opts.delay ?? 0;
      const createdAt = job.timestamp ?? now;

      const target = createdAt + delay;
      const remaining = Math.max(target - now, 0);

      const totalSeconds = Math.floor(remaining / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      let formatted = '';
      days > 0 && (formatted += `${days}d `);
      hours > 0 && (formatted += `${hours}h `);
      minutes > 0 && (formatted += `${minutes}m `);
      seconds > 0 && (formatted += `${seconds}s`);

      const executionTime = new Date(target).toISOString();

      this.logger.log(
        `📥 Job ${job.data.eventId} "${job.data.eventName}" is waiting. 
     ⏳ Time left: ${formatted} (executes at ${executionTime})`,
      );
    });
  }

  private initWorker() {
    this.eventWorker = new Worker<SpecialEventJobData>(
      this.queueName,
      async (job: Job<SpecialEventJobData>) => {
        this.logger.debug('t5l rabk bech y5dm l job');
        await this.processSendSpecialEventsNotification(job);
      },
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

  async removeExistingJob(specialEventId: string) {
    const firstDelayJobId = this.getJobId(specialEventId, 'firstDelay');
    const secondDelayJobId = this.getJobId(specialEventId, 'secondDelay');

    const firstDelayJob = await this.eventQueue.getJob(firstDelayJobId);
    const secondDelayJob = await this.eventQueue.getJob(secondDelayJobId);

    if (firstDelayJob) {
      this.logger.debug('Deleted previous first delay job');
      await firstDelayJob.remove();
    } else {
      this.logger.debug('No previous first delay job to delete');
    }
    if (secondDelayJob) {
      this.logger.debug('Deleted previous second delay job');
      await secondDelayJob.remove();
    } else {
      this.logger.debug('No previous second delay job to delete');
    }
  }

  async addSpecialEventNotification(data: IAddSpecialEvent) {
    this.logger.log('Adding special event notification job for ', data.eventName);

    await this.removeExistingJob(data.eventId);

    const delayInMs = data.startDate.getTime() - Date.now();
    const firstDelay = delayInMs - this.firstNotificationDelay;
    const secondDelay = delayInMs - this.secondNotificationDelay;

    if (firstDelay > 0) {
      const jobId = this.getJobId(data.eventId, 'firstDelay');
      const eventJobPayload: SpecialEventJobData = {
        eventId: data.eventId,
        eventName: data.eventName,
        startDate: data.startDate.toUTCString(),
        endDate: data.endDate.toUTCString(),
        delay: 'firstDelay',
      };
      await this.eventQueue.add(data.eventId, eventJobPayload, { jobId: jobId, delay: firstDelay });
    }

    if (secondDelay > 0) {
      const jobId = this.getJobId(data.eventId, 'secondDelay');
      const eventJobPayload: SpecialEventJobData = {
        eventId: data.eventId,
        eventName: data.eventName,
        startDate: data.startDate.toUTCString(),
        endDate: data.endDate.toUTCString(),
        delay: 'secondDelay',
      };
      await this.eventQueue.add(data.eventId, eventJobPayload, {
        jobId: jobId,
        delay: secondDelay,
      });
    }
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

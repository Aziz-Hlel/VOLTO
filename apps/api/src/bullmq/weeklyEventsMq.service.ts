import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import ENV from 'src/config/env';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommonEventsMqService } from './CommonEventsMq.service';
import { LadiesNightDataMqService } from './LadiesNightDataMq.service';

export interface IAddWeeklyEvent {
  eventId: string;
  eventName: string;
  cronStartDate: string;
  cronEndDate: string;
  isLadiesNight: boolean;
}

export interface WeeklyEventJobData {
  eventId: string;
  eventName: string;
  cronStartDate: string;
  cronEndDate: string;
  delay: 'firstDelay' | 'secondDelay';
  isLadiesNight: boolean;
}

@Injectable()
export class WeeklyEventMq implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(WeeklyEventMq.name);

  private readonly queueName = 'weeklyEvents-scheduler';
  private eventQueue: Queue<WeeklyEventJobData>;

  private eventWorker: Worker<WeeklyEventJobData>;

  private readonly oneSignalUrl = 'https://api.onesignal.com/notifications';

  public constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly commonEventsMq: CommonEventsMqService,
    private readonly ladiesNightDataMq: LadiesNightDataMqService,
  ) {}

  private async processSendSpecialEventsNotification(job: Job<WeeklyEventJobData>) {
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

  shiftCronDayBack(cronExpr: string): string {
    const parts = cronExpr.split(' '); // split into [minute, hour, day, month, dayOfWeek]
    if (parts.length !== 5) {
      // throw new Error('Invalid cron expression');
      return cronExpr;
    }

    let dayOfWeek = parts[4];

    // handle numeric day only (0=Sun, 1=Mon,...6=Sat)
    if (!/^\d$/.test(dayOfWeek)) {
      return cronExpr;
      // throw new Error('Day-of-week must be a single digit 0-6');
    }

    const shiftedDay = (parseInt(dayOfWeek) + 6) % 7; // day-1
    parts[4] = shiftedDay.toString();

    return parts.join(' ');
  }

  async addWeeklyEventNotification(data: IAddWeeklyEvent) {
    const firstDelayjobId = this.getJobId(data.eventId, 'firstDelay');

    const cronStartDateDayShifted = this.shiftCronDayBack(data.cronStartDate);

    const eventJobPayload: WeeklyEventJobData = {
      eventId: data.eventId,
      eventName: data.eventName,
      cronStartDate: cronStartDateDayShifted,
      cronEndDate: data.cronEndDate,
      delay: 'firstDelay',
      isLadiesNight: data.isLadiesNight,
    };

    await this.eventQueue.add(
      firstDelayjobId, // name of the job
      eventJobPayload, // payload
      {
        repeat: {
          pattern: cronStartDateDayShifted,
          tz: 'utc', // optional: timezone
        },
        repeatJobKey: firstDelayjobId,
      },
    );

    if (data.isLadiesNight) {
      const ladiesNightStatsJobPayload: WeeklyEventJobData = {
        eventId: data.eventId,
        eventName: data.eventName,
        cronStartDate: data.cronStartDate,
        cronEndDate: data.cronEndDate,
        delay: 'firstDelay',
        isLadiesNight: data.isLadiesNight,
      };
      await this.ladiesNightDataMq.addJob(ladiesNightStatsJobPayload);
    }
  }

  async removeWeeklyEventNotification(eventId: string) {
    const firstDelayJobId = this.getJobId(eventId, 'firstDelay');

    const allJobSchedulers = await this.eventQueue.getJobSchedulers();

    allJobSchedulers.map((scheduler) => {
      scheduler.name === firstDelayJobId && this.eventQueue.removeJobScheduler(scheduler.key);
    });
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

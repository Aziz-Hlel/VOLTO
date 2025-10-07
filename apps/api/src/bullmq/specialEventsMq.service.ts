import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';

interface IAddEvent {
  eventId: string;
  eventName: string;
  startDate: Date;
  endDate: Date;
}

interface EventJobData {
  eventId: string;
  eventName: string;
  startDate: string;
  endDate: string;
}

@Injectable()
export class SpecialEventMq implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(SpecialEventMq.name);

  private readonly queueName = 'specialEvents-scheduler';
  private eventQueue: Queue<EventJobData>;

  private eventWorker: Worker<EventJobData>;

  private readonly _hour = 1000 * 60 * 60;
  private readonly firstNotificationDelay = 0; // !this._hour * 24;
  private readonly secondNotificationDelay = 0; // !this._hour * 2;

  public constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  private processSendSpecialEventsNotification(job: Job<EventJobData>) {
    console.log(
      'Notification started Now for event : ',
      job.data.eventName,
      '\n\tEvents starts in : ',
      (new Date(job.data.startDate).getTime() - Date.now()) / 1000,
      ' sec',
    );
  }

  private initQueue() {
    this.eventQueue = new Queue<EventJobData>(this.queueName, {
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
    this.eventWorker = new Worker<EventJobData>(
      this.queueName,
      async (job: Job<EventJobData>) => await this.processSendSpecialEventsNotification(job),
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

  async addSpecialEventNotification(data: IAddEvent) {
    const delayInMs = data.startDate.getTime() - Date.now();
    const firstDelay = delayInMs - this.firstNotificationDelay;
    const secondDelay = delayInMs - 2000 - this.secondNotificationDelay;

    if (firstDelay > 0) {
      const jobId = this.getJobId(data.eventId, 'firstDelay');
      const eventJobPayload: EventJobData = {
        eventId: data.eventId,
        eventName: data.eventName,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };
      await this.eventQueue.add(data.eventId, eventJobPayload, { jobId: jobId, delay: firstDelay });
    }

    if (secondDelay > 0) {
      const jobId = this.getJobId(data.eventId, 'secondDelay');
      const eventJobPayload: EventJobData = {
        eventId: data.eventId,
        eventName: data.eventName,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };
      await this.eventQueue.add(data.eventId, eventJobPayload, {
        jobId: jobId,
        delay: secondDelay,
      });
    }
  }

  async updateSpecialEventNotification(data: IAddEvent) {
    const firstDelayJobId = this.getJobId(data.eventId, 'firstDelay');
    const secondDelayJobId = this.getJobId(data.eventId, 'secondDelay');

    const firstDelayJob = await this.eventQueue.getJob(firstDelayJobId);
    const secondDelayJob = await this.eventQueue.getJob(secondDelayJobId);

    await firstDelayJob?.remove();
    await secondDelayJob?.remove();

    await this.addSpecialEventNotification(data);
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

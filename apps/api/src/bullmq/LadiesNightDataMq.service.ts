import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { WeeklyEventJobData } from './weeklyEventsMq.service';
import { Job, Queue, Worker } from 'bullmq';
import cronParser from 'cron-parser';
import cron from 'node-cron';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LadiesNightDataMqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(LadiesNightDataMqService.name);

  private readonly queueName = 'LadiesEventData-recorder';

  private eventQueue: Queue<WeeklyEventJobData>;

  private eventWorker: Worker<WeeklyEventJobData>;

  public constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis,private readonly prisma: PrismaService) {}


    private async updateLadiesNightData({currentEventStartDate}:{currentEventStartDate:Date}){ {
        
    }}


  private async addDataScheduler(job: Job<WeeklyEventJobData>) {
    const task =await cron.schedule('*/15 * * * *', () => {
      const cronEndDateParsed = cronParser.parse(job.data.cronEndDate);
      const currentEventEndDate = cronEndDateParsed.next().toDate();
      const currentDate = new Date();
      if (currentDate > currentEventEndDate) task.stop();
      const startDateParsed = cronParser.parse(job.data.cronStartDate);
      const currentEventStartDate = startDateParsed.next().toDate();

    });
  }

  async addJob(job: Job<WeeklyEventJobData>) {
    await this.eventQueue.add(job.data.eventId, job.data, {
      jobId: job.data.eventId,
      repeatJobKey: job.data.eventId,
      repeat: {
        pattern: job.data.cronStartDate,
        utc: true,
      },
    });
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
      async (job: Job<WeeklyEventJobData>) => await this.addDataScheduler(job),
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

  onModuleInit() {
    this.initQueue();
    this.initWorker();
  }

  onModuleDestroy() {
    throw new Error('Method not implemented.');
  }
}

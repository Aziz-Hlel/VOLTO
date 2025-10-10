import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { WeeklyEventJobData } from './weeklyEventsMq.service';
import { Queue,Worker } from 'bullmq';

@Injectable()
export class LadiesNightDataMqService implements OnModuleInit, OnModuleDestroy{
  private readonly logger = new Logger(LadiesNightDataMqService.name);

  private readonly queueName = 'LadiesEventData-recorder';

  private eventQueue: Queue<WeeklyEventJobData>;

  private eventWorker: Worker<WeeklyEventJobData>;

  public constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}



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


  onModuleInit() {
    this.initQueue();
  }

 onModuleDestroy() {
    throw new Error('Method not implemented.');
  }


}

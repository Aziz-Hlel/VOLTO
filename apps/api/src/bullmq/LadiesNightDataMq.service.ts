import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { WeeklyEventJobData } from './weeklyEventsMq.service';
import { Queue } from 'bullmq';

@Injectable()
export class LadiesNightDataMqService {
  private readonly logger = new Logger(LadiesNightDataMqService.name);

  private readonly queueName = 'LadiesEventData-scheduler';

  private eventQueue: Queue<WeeklyEventJobData>;

//   private eventWorker: Worker<WeeklyEventJobData>;

  public constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}
}

import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Job, Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpecialEventJobData } from './specialEventsMq.service';
import { REDIS_HASHES } from 'src/redis/hashes';
import cron, { ScheduledTask } from 'node-cron';

@Injectable()
export class SpinningWheelDataMqService implements OnModuleInit {
  private readonly logger = new Logger(SpinningWheelDataMqService.name);

  private readonly queueName = 'spinning-wheel-data-recorder';

  private eventQueue: Queue<SpecialEventJobData>;

  private eventWorker: Worker<SpecialEventJobData>;

  private currentWorkingTask: ScheduledTask | null;

  public constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly prisma: PrismaService,
  ) {}

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
        `📥 Job with name : "${job.data.eventName}" and  id: ${job.data.eventId}  has been created and is waiting`,
      );
    });
  }
  private async resetSpinningWheelStats(strStartDate: string) {
    const startDate = new Date(strStartDate);

    await this.redis.hset(REDIS_HASHES.SPINNING_WHEEL.STATS.HASH(), {
      [REDIS_HASHES.SPINNING_WHEEL.STATS.TOTAL_PARTICIPANTS()]: 0,
      [REDIS_HASHES.SPINNING_WHEEL.STATS.PARTICIPANTS_WITH_CODE_REDEEMED()]: 0,
    });

    await this.prisma.spinningWheelData.upsert({
      create: {
        startDate: startDate,
        totalParticipants: 0,
        participantsRedeemedCode: 0,
      },
      update: {
        totalParticipants: 0,
        participantsRedeemedCode: 0,
      },
      where: {
        startDate: startDate,
      },
    });
  }

  private async addDataScheduler(job: Job<SpecialEventJobData>) {
    this.logger.debug(`📥 Spinning Wheel weekly Job for Data Recording has started `);

    await this.resetSpinningWheelStats(job.data.startDate);
    const endDate = new Date(job.data.endDate);

    const task = cron.schedule('*/1 * * * *', async () => {
      // ! change to 15 min later
      this.logger.debug(`🕒1mn passed : Updating Spinning Wheel Data...`);
      const currentDate = new Date();

      if (currentDate > endDate) {
        this.currentWorkingTask = null;
        this.logger.debug(
          `⏹ Spinning Wheel Data Recording Task stopped as end date ${job.data.endDate} reached`,
        );
        await task.stop();
        return;
      }

      const statHash = REDIS_HASHES.SPINNING_WHEEL.STATS.HASH();

      const pipeline = this.redis.pipeline();
      pipeline.hget(statHash, REDIS_HASHES.SPINNING_WHEEL.STATS.TOTAL_PARTICIPANTS());
      pipeline.hget(statHash, REDIS_HASHES.SPINNING_WHEEL.STATS.PARTICIPANTS_WITH_CODE_REDEEMED());

      const [totalParticipants, participantsWithRedeemedCode] = await this.redis.hmget(
        statHash,
        REDIS_HASHES.SPINNING_WHEEL.STATS.TOTAL_PARTICIPANTS(),
        REDIS_HASHES.SPINNING_WHEEL.STATS.PARTICIPANTS_WITH_CODE_REDEEMED(),
      );

      await this.prisma.spinningWheelData.upsert({
        where: {
          startDate: new Date(job.data.startDate),
        },
        create: {
          totalParticipants: Number(totalParticipants),
          participantsRedeemedCode: Number(participantsWithRedeemedCode),
          startDate: new Date(job.data.startDate),
        },
        update: {
          totalParticipants: Number(totalParticipants),
          participantsRedeemedCode: Number(participantsWithRedeemedCode),
        },
      });
    });

    await task.start();

    this.currentWorkingTask = task;
  }

  private async deletePreviousJob(jobId: string) {
    if (this.currentWorkingTask) {
      await this.currentWorkingTask.stop();
      this.currentWorkingTask = null;
      this.logger.debug('Stopped Current running spinning wheel data recorder task');
    }

    const firstDelayJob = await this.eventQueue.getJob(jobId);

    if (firstDelayJob) {
      this.logger.debug('Deleted previous first delay job');
      await firstDelayJob.remove();
    } else {
      this.logger.debug('No previous first delay job to delete');
    }
  }

  async addJob(jobData: SpecialEventJobData) {
    this.logger.debug(`📥 Adding Spinning Wheel Job To excute every cron start Date`);

    await this.deletePreviousJob(jobData.eventId);

    const delayInMs = new Date(jobData.startDate).getTime() - Date.now();

    await this.eventQueue.add(jobData.eventId, jobData, {
      jobId: jobData.eventId,
      repeatJobKey: jobData.eventId,
      delay: delayInMs,
    });
  }

  private initWorker() {
    this.eventWorker = new Worker<SpecialEventJobData>(
      this.queueName,
      async (job: Job<SpecialEventJobData>) => await this.addDataScheduler(job),
      {
        connection: this.redis,
        concurrency: 1,
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
}

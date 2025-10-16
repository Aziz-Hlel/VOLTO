import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { WeeklyEventJobData } from './weeklyEventsMq.service';
import { Job, Queue, Worker } from 'bullmq';
import cronParser from 'cron-parser';
import cron from 'node-cron';
import { PrismaService } from 'src/prisma/prisma.service';
import { REDIS_HASHES } from 'src/redis/hashes';

@Injectable()
export class LadiesNightDataMqService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(LadiesNightDataMqService.name);

  private readonly queueName = 'LadiesEventData-recorder';

  private eventQueue: Queue<WeeklyEventJobData>;

  private eventWorker: Worker<WeeklyEventJobData>;

  public constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly prisma: PrismaService,
  ) {}

  private async updateLadiesNightData({
    currentEventStartDate,
    totalParticipants,
    participantsWithAllRedeemedDrinks,
    totalDrinksConsumed,
  }: {
    currentEventStartDate: Date;
    totalParticipants: number;
    participantsWithAllRedeemedDrinks: number;
    totalDrinksConsumed: number;
  }) {
    try {
      await this.prisma.ladiesNightData.upsert({
        where: {
          startDate: currentEventStartDate,
        },
        create: {
          startDate: currentEventStartDate,
          totalParticipants: totalParticipants,
          participantWithAllRedeemedDrinks: participantsWithAllRedeemedDrinks,
          totalDrinksConsumed: totalDrinksConsumed,
          drinkQuota: 0,
        },
        update: {
          startDate: currentEventStartDate,
          totalParticipants: totalParticipants,
          participantWithAllRedeemedDrinks: participantsWithAllRedeemedDrinks,
          totalDrinksConsumed: totalDrinksConsumed,
        },
      });
    } catch (error) {
      this.logger.error('❌ Fatal error updating ladies night stats to DB', error);
    }
  }

  private async resetLadiesNightStats(startDate: Date) {
    this.logger.debug(`🕒Resetting ladies night stats in redis and adding instance in DB`);
    await this.redis.del(REDIS_HASHES.LADIES_NIGHT.STATS.HASH());

    const ladiesNight_DrinkQuota = await this.redis.hget(
      REDIS_HASHES.APP_SETTINGS.HASH(),
      REDIS_HASHES.APP_SETTINGS.LADIES_NIGHT_DRINK_QUOTA(),
    );

    await this.redis.hset(REDIS_HASHES.LADIES_NIGHT.STATS.HASH(), {
      [REDIS_HASHES.LADIES_NIGHT.STATS.TOTAL_PARTICIPANTS()]: 0,
      [REDIS_HASHES.LADIES_NIGHT.STATS.PARTICIPANTS_WITH_ALL_REDEEMED_DRINKS()]: 0,
      [REDIS_HASHES.LADIES_NIGHT.STATS.TOTAL_DRINKS_CONSUMED()]: 0,
      [REDIS_HASHES.LADIES_NIGHT.STATS.DRINK_QUOTA()]: ladiesNight_DrinkQuota,
    });

    const ladiesNightData = await this.prisma.ladiesNightData.create({
      data: {
        startDate: startDate,
        totalParticipants: 0,
        participantWithAllRedeemedDrinks: 0,
        totalDrinksConsumed: 0,
        drinkQuota: Number(ladiesNight_DrinkQuota),
      },
    });

    console.log('ladiesNightData created : ', ladiesNightData);
  }

  private async addDataScheduler(job: Job<WeeklyEventJobData>) {
    this.logger.debug(`Ladies Night weekly Job started`);
    const cronStartDateParsed = cronParser.parse(job.data.cronStartDate);
    const currentEventStartDate = cronStartDateParsed.prev().toDate();

    await this.resetLadiesNightStats(currentEventStartDate);

    const task = cron.schedule('*/1 * * * *', async () => {
      this.logger.debug(`🕒1mn passed : Updating ladies night data...`);
      const cronEndDateParsed = cronParser.parse(job.data.cronEndDate);
      const currentEventEndDate = cronEndDateParsed.next().toDate();
      const currentDate = new Date();
      if (currentDate > currentEventEndDate) task.stop();
      const startDateParsed = cronParser.parse(job.data.cronStartDate);
      const currentEventStartDate = startDateParsed.prev().toDate();

      const statHash = REDIS_HASHES.LADIES_NIGHT.STATS.HASH();

      const pipeline = this.redis.pipeline();
      pipeline.hget(statHash, REDIS_HASHES.LADIES_NIGHT.STATS.TOTAL_PARTICIPANTS());
      pipeline.hget(
        statHash,
        REDIS_HASHES.LADIES_NIGHT.STATS.PARTICIPANTS_WITH_ALL_REDEEMED_DRINKS(),
      );
      pipeline.hget(statHash, REDIS_HASHES.LADIES_NIGHT.STATS.TOTAL_DRINKS_CONSUMED());

      const [totalParticipants, participantsWithAllRedeemedDrinks, totalDrinksConsumed] =
        (await pipeline.exec())!.map(([err, res]) => res);

      await this.updateLadiesNightData({
        currentEventStartDate: currentEventStartDate,
        totalParticipants: Number(totalParticipants),
        participantsWithAllRedeemedDrinks: Number(participantsWithAllRedeemedDrinks),
        totalDrinksConsumed: Number(totalDrinksConsumed),
      });
    });

    await task.execute();
  }

  async deletePreviousJob(jobId: string) {
    const allJobSchedulers = await this.eventQueue.getJobSchedulers();

    const targetScheduler = allJobSchedulers.find((scheduler) => scheduler.name === jobId);

    if (targetScheduler) {
      this.logger.debug('Deleted previous Ladies Night Stats repeatable job');
      await this.eventQueue.removeJobScheduler(targetScheduler.key);
    } else {
      this.logger.debug('No previous Ladies Night Stats repeatable job to delete');
    }
  }

  async addJob(jobData: WeeklyEventJobData) {
    this.logger.debug(`📥 Adding Ladies Night Job To excute every cron start Date`);

    this.deletePreviousJob(jobData.eventId);

    await this.eventQueue.add(jobData.eventId, jobData, {
      jobId: jobData.eventId,
      repeatJobKey: jobData.eventId,
      repeat: {
        pattern: jobData.cronStartDate,
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

import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MembershipStatus, Role, TransactionType } from '@prisma/client';
import { Job, Queue, Worker } from 'bullmq';
import Redis from 'ioredis';
import { MembersService } from 'src/members/members.service';
import { membershipTypeBalance } from 'src/members/utils/membershipTypeBalance';
import { PrismaService } from 'src/prisma/prisma.service';

interface MembershipExpiryJobData {
  triggeredAt: string;
}

@Injectable()
export class MembershipTransactionEventMq implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MembershipTransactionEventMq.name);

  private readonly queueName = 'membership-expiry-scheduler';
  private readonly jobName = 'check-expired-memberships';
  private readonly balanceResetJobName = 'reset-member-balances';

  private queue: Queue<MembershipExpiryJobData>;
  private worker: Worker<MembershipExpiryJobData>;
  private static = 3 * 60 * 1000; // 30 days in milliseconds

  public constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly prisma: PrismaService,
  ) {}

  // ---------------------------------------------------------------------------
  // Queue
  // ---------------------------------------------------------------------------

  private initQueue() {
    this.queue = new Queue<MembershipExpiryJobData>(this.queueName, {
      connection: this.redis,
      defaultJobOptions: {
        removeOnComplete: 50,
        removeOnFail: 100,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });

    this.queue.on('waiting', (job) => {
      this.logger.log(`📥 Membership expiry job queued at ${job.data?.triggeredAt}`);
    });
  }

  // ---------------------------------------------------------------------------
  // Worker
  // ---------------------------------------------------------------------------

  private initWorker() {
    this.worker = new Worker<MembershipExpiryJobData>(
      this.queueName,
      async (job: Job<MembershipExpiryJobData>) => {
        if (job.name === this.balanceResetJobName) {
          return this.processBalanceReset(job);
        }
        return this.processExpiredMemberships(job);
      },
      {
        connection: this.redis,
        concurrency: 1,
      },
    );

    this.worker.on('completed', (job) => {
      this.logger.log(`✅ Membership expiry check completed (job ${job.id})`);
    });

    this.worker.on('failed', (job, err) => {
      this.logger.error(`❌ Membership expiry check failed (job ${job?.id}): ${err.message}`);
    });

    this.worker.on('error', (err) => {
      this.logger.error('BullMQ Worker error:', err);
    });
  }

  // ---------------------------------------------------------------------------
  // Job processor
  // ---------------------------------------------------------------------------

  private async processExpiredMemberships(job: Job<MembershipExpiryJobData>) {
    this.logger.debug(
      `🔍 Running membership expiry cron job — triggered at ${job.data.triggeredAt}`,
    );

    const now = new Date();

    const { count } = await this.prisma.membership.updateMany({
      where: {
        expiryDate: { lt: now },
        status: { not: MembershipStatus.EXPIRED },
      },
      data: {
        status: MembershipStatus.EXPIRED,
      },
    });

    if (count > 0) {
      this.logger.log(`⏰ Marked ${count} membership(s) as EXPIRED`);
    } else {
      this.logger.debug('No memberships to expire');
    }
  }

  // ---------------------------------------------------------------------------
  // Balance reset processor
  // ---------------------------------------------------------------------------

  private async processBalanceReset(job: Job<MembershipExpiryJobData>) {
    this.logger.debug(`💰 Running balance reset cron job — triggered at ${job.data.triggeredAt}`);

    const now = new Date();

    // Find a system performer (first SYSTEM) to attach to the transaction
    const systemUser = await this.prisma.user.findFirst({
      where: { role: Role.SYSTEM },
      select: { id: true },
    });

    if (!systemUser) {
      this.logger.warn('⚠️ No SYSTEM user found — skipping balance reset');
      return;
    }

    // Fetch all active memberships whose currentPeriodEnd has passed
    const memberships = await this.prisma.membership.findMany({
      where: {
        currentPeriodEnd: { lt: now },
        status: {
          in: [MembershipStatus.ACTIVE, MembershipStatus.EXPIRED, MembershipStatus.REJECTED],
        },
      },
      select: {
        id: true,
        currentPeriodEnd: true,
        membershipApplication: {
          select: { membershipType: true },
        },
      },
    });

    if (memberships.length === 0) {
      this.logger.debug('No memberships due for a balance reset');
      return;
    }

    this.logger.log(`💳 Processing balance reset for ${memberships.length} membership(s)`);

    for (const membership of memberships) {
      const balance = membershipTypeBalance[membership.membershipApplication.membershipType];

      // Advance currentPeriodEnd by exactly 30 days from its current value
      //   const nextPeriodEnd = new Date(membership.currentPeriodEnd);
      //   nextPeriodEnd.setDate(nextPeriodEnd.getDate() + 30);

      const nextPeriodEnd = new Date(Date.now() + MembersService.RESET_TIME);

      await this.prisma.$transaction(async (tx) => {
        await tx.membership.update({
          where: { id: membership.id },
          data: {
            balance,
            currentPeriodEnd: nextPeriodEnd,
          },
        });

        await tx.memberTransactionHistory.create({
          data: {
            membershipId: membership.id,
            amount: balance,
            transactionType: TransactionType.RENEWAL,
            note: 'Monthly Balance Reset',
            performedById: systemUser.id,
          },
        });
      });
    }

    this.logger.log(`✅ Balance reset complete for ${memberships.length} membership(s)`);
  }

  // ---------------------------------------------------------------------------
  // Repeatable job — runs every 5 minutes
  // ---------------------------------------------------------------------------

  private async addRepeatableJob() {
    // Remove any stale schedulers for both jobs before re-registering
    const existing = await this.queue.getJobSchedulers();
    for (const scheduler of existing) {
      if (scheduler.name === this.jobName || scheduler.name === this.balanceResetJobName) {
        await this.queue.removeJobScheduler(scheduler.key);
        this.logger.debug(`Removed stale scheduler: ${scheduler.key}`);
      }
    }

    // 1️⃣ Expiry check — every 5 minutes
    await this.queue.add(
      this.jobName,
      { triggeredAt: new Date().toISOString() },
      {
        repeat: {
          pattern: '*/5 * * * *',
          tz: 'utc',
        },
        repeatJobKey: this.jobName,
      },
    );
    this.logger.log(`🕐 Membership expiry cron registered (every 5 minutes)`);

    // 2️⃣ Balance reset — every 5 minutes
    await this.queue.add(
      this.balanceResetJobName,
      { triggeredAt: new Date().toISOString() },
      {
        repeat: {
          pattern: '*/5 * * * *',
          tz: 'utc',
        },
        repeatJobKey: this.balanceResetJobName,
      },
    );
    this.logger.log(`🕐 Balance reset cron registered (every 5 minutes)`);
  }

  // ---------------------------------------------------------------------------
  // Lifecycle hooks
  // ---------------------------------------------------------------------------

  async onModuleInit() {
    this.initQueue();
    this.initWorker();
    await this.addRepeatableJob();
  }

  async onModuleDestroy() {
    await this.worker?.close();
    await this.queue?.close();
  }
}

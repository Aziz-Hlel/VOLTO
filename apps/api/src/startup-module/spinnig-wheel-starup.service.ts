import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpinnigWheelRewardService } from 'src/spinnig-wheel-reward/spinnig-wheel-reward.service';
import { SpinnigWheelService } from 'src/spinnig-wheel/spinnig-wheel.service';

@Injectable()
export class SpinningWheelInitService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SpinningWheelInitService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly spinnigWheelService: SpinnigWheelService,
    private readonly spinnigWheelRewardService: SpinnigWheelRewardService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async onApplicationBootstrap() {
    let spinnigWheel = await this.spinnigWheelService.isSpinnigWheelExists();

    if (!spinnigWheel)
      spinnigWheel = await this.spinnigWheelService.create({
        name: 'Spinnig Wheel',
      });

    const spinnigWheelRewards = await this.prisma.spinningWheelReward.findMany();

    while (spinnigWheelRewards.length < 5) {
      const newReward = await this.spinnigWheelRewardService.create({
        name: `Reward ${spinnigWheelRewards.length + 1}`,
      });
      spinnigWheelRewards.push(newReward);
    }

    this.spinnigWheelRewardService.updateRewardsCache(spinnigWheelRewards);

    this.logger.log('✅ Spinning Wheel Initialized');
  }
}

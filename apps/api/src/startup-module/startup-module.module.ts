import { Module } from '@nestjs/common';
import { SpinnigWheelModule } from 'src/spinnig-wheel/spinnig-wheel.module';
import { SpinnigWheelRewardModule } from 'src/spinnig-wheel-reward/spinnig-wheel-reward.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SpinningWheelInitService } from './spinnig-wheel-starup.service';
import { StartupModuleService } from './startup-module.service';

@Module({
  imports: [PrismaModule, SpinnigWheelModule, SpinnigWheelRewardModule],
  providers: [StartupModuleService, SpinningWheelInitService],
})
export class StartupModuleModule {}

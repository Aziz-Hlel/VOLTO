import { forwardRef, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SpinnigWheelRewardModule } from 'src/spinnig-wheel-reward/spinnig-wheel-reward.module';
import { SpinnigWheelService } from './spinnig-wheel.service';
import { SpinnigWheelController } from './spinnig-wheel.controller';

@Module({
  imports: [
    PrismaModule,
    forwardRef(() => SpinnigWheelRewardModule), // Keep forwardRef here too
  ],
  controllers: [SpinnigWheelController],
  providers: [SpinnigWheelService],
  exports: [SpinnigWheelService],
})
export class SpinnigWheelModule {}

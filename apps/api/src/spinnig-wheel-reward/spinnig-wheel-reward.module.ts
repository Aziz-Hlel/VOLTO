import { forwardRef, Module } from '@nestjs/common';
import { SpinnigWheelModule } from 'src/spinnig-wheel/spinnig-wheel.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { SpinnigWheelRewardController } from './spinnig-wheel-reward.controller';
import { SpinnigWheelRewardService } from './spinnig-wheel-reward.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    forwardRef(() => SpinnigWheelModule), // Add forwardRef here
  ],
  controllers: [SpinnigWheelRewardController],
  providers: [SpinnigWheelRewardService],
  exports: [SpinnigWheelRewardService],
})
export class SpinnigWheelRewardModule {}

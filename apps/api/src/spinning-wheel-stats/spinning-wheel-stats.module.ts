import { Module } from '@nestjs/common';
import { SpinningWheelStatsService } from './spinning-wheel-stats.service';
import { SpinningWheelStatsController } from './spinning-wheel-stats.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SpinningWheelStatsController],
  providers: [SpinningWheelStatsService],
})
export class SpinningWheelStatsModule {}

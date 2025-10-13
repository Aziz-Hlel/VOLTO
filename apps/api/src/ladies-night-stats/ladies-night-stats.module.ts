import { Module } from '@nestjs/common';
import { LadiesNightStatsService } from './ladies-night-stats.service';
import { LadiesNightStatsController } from './ladies-night-stats.controller';

@Module({
  controllers: [LadiesNightStatsController],
  providers: [LadiesNightStatsService],
})
export class LadiesNightStatsModule {}

import { Module } from '@nestjs/common';
import { LadiesNightStatsService } from './ladies-night-stats.service';
import { LadiesNightStatsController } from './ladies-night-stats.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LadiesNightStatsController],
  providers: [LadiesNightStatsService],
})
export class LadiesNightStatsModule {}

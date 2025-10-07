import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LadiesNightModule } from 'src/ladies-night/ladies-night.module';
import { SpecialEventMq } from './specialEventsMq.service';
import { WeeklyEventMq } from './weeklyEventsMq.service';

@Module({
  imports: [PrismaModule, LadiesNightModule],
  providers: [SpecialEventMq, WeeklyEventMq],
  exports: [SpecialEventMq, WeeklyEventMq],
})
export class BullmqModule {}

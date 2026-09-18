import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LadiesNightModule } from 'src/ladies-night/ladies-night.module';
import { SpecialEventMq } from './specialEventsMq.service';
import { WeeklyEventMq } from './weeklyEventsMq.service';
import { CommonEventsMqService } from './CommonEventsMq.service';
import { LadiesNightDataMqService } from './LadiesNightDataMq.service';
import { SpinningWheelDataMqService } from './SpinningWheelDataMq.service';
import { MembershipTransactionEventMq } from './membership-transaction.service';

@Module({
  imports: [PrismaModule, LadiesNightModule],
  providers: [
    CommonEventsMqService,
    SpecialEventMq,
    WeeklyEventMq,
    LadiesNightDataMqService,
    SpinningWheelDataMqService,
    MembershipTransactionEventMq,
  ],
  exports: [SpecialEventMq, WeeklyEventMq, SpinningWheelDataMqService, MembershipTransactionEventMq],
})
export class BullmqModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LadiesNightModule } from 'src/ladies-night/ladies-night.module';
import { SpecialEventMq } from './specialEventsMq.service';

@Module({
  imports: [PrismaModule, LadiesNightModule],
  providers: [SpecialEventMq],
  exports: [SpecialEventMq],
})
export class BullmqModule {}

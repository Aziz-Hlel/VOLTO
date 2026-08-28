import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { BullmqModule } from 'src/bullmq/bullmq.module';
import { LadiesNightModule } from 'src/ladies-night/ladies-night.module';
import { MediaModule } from 'src/media/media.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [PrismaModule, AuthModule, MediaModule, BullmqModule, LadiesNightModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

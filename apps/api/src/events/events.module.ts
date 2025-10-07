import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { BullmqModule } from 'src/bullmq/bullmq.module';

@Module({
  imports: [PrismaModule, AuthModule, MediaModule, BullmqModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}

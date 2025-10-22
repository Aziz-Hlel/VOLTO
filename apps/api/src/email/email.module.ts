import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ReservationController } from './reservation.controller';
import { ContactController } from './contact.controller';

@Module({
  controllers: [ReservationController, ContactController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ReservationController } from './reservation.controller';

@Module({
  controllers: [ReservationController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}

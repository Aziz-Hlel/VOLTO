import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { EmailService } from './email.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(200)
  @Post()
  async receiveReservation(@Body() payload: CreateReservationDto) {
    const response = await this.emailService.sendRequestReservationEmailToAdmin(payload);
    return {
      success: true,
      message: 'Reservation recieved successfully',
    };
  }
}

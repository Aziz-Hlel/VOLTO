import { Body, Controller, HttpCode, Post, ServiceUnavailableException } from "@nestjs/common";
import { EmailService } from "./email.service";
import { CreateContactDto } from "./dto/create-contact.dto";



@Controller('contact')
export class ContactController {
  constructor(private readonly emailService: EmailService) {}

  @HttpCode(200)
  @Post()
  async receiveContactMessage(@Body() payload: CreateContactDto) {
   const response =  await this.emailService.sendContactMessageEmailToAdmin(payload);

   if(!response.success)
        throw new ServiceUnavailableException('Failed to send contact message');
    
    return {
      success: true,
      message: 'Contact message received successfully',
    };
  }
}
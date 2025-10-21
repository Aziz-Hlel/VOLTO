import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { join } from 'path';
import ENV from 'src/config/env';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { CreateContactDto } from './dto/create-contact.dto';

class ExceptionOptions {
  throwable: boolean = true;
}

class IsendEmail {
  email: string;
  subject: string;
  content: string;
  ExceptionOptions: ExceptionOptions;
}

abstract class AbsctractServiceResponse {
  abstract success: boolean;
}

class SuccessResponse extends AbsctractServiceResponse {
  success: true;
}

class ErrorResponse extends AbsctractServiceResponse {
  success: false;
  error: unknown;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  private readonly EMAIL_ADDRESSES = {
    support: 'support@voltobahrain.online',
  };

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: ENV.SMTP_HOST,
      port: ENV.SMTP_PORT,
      secure: ENV.SMTP_SECURE,
      auth: {
        user: ENV.SMTP_USER,
        pass: ENV.SMTP_PASS,
      },
    });

    this.transporter
      .verify()
      .then(() => {
        this.logger.log('✅ Connected to email server');
      })
      .catch((error) => {
        this.logger.fatal('❌ Unable to connect to email server');
        this.logger.error(error);
      });
  }

  async sendEmail<T extends IsendEmail>(
    payload: T,
  ): Promise<
    T['ExceptionOptions'] extends { throwable: true }
      ? SuccessResponse | ErrorResponse
      : SuccessResponse | ErrorResponse
  > {
    try {
      const info = await this.transporter.sendMail({
        from: this.EMAIL_ADDRESSES.support,
        to: payload.email,
        subject: payload.subject,
        text: payload.content,
      });
      return {
        success: true,
      };
    } catch (e) {
      this.logger.error(e);
      const throwable = payload.ExceptionOptions?.throwable ?? true;

      if (e.responseCode === 550) {
        if (throwable)
          throw new BadRequestException({ success: false, message: 'Invalid recipient address' });
        return {
          success: false,
          error: {
            message: 'Invalid recipient address',
          },
        };
      }
      if (throwable)
        throw new ServiceUnavailableException({
          success: false,
          message: 'Email service unavailable',
        });
      else
        return {
          success: false,
          error: e,
        };
    }
  }

  async sendResetPasswordEmail({ recipient, token }: { recipient: string; token: string }) {
    const templatePath = join(process.cwd(), 'templates', 'reset-password.html');
    let html = readFileSync(templatePath, 'utf-8');

    const resetUrl = `${ENV.WEB_URL}/reset-password?token=${token}`; // ! to be change

    const subject = 'Reset Your Password';
    const logoUrl = `${ENV.API_URL}/public/logo.dark.png`; // ! kifkif
    const companyName = 'VOLTO';

    html = html
      .replace(/{{RESET_LINK}}/g, resetUrl)
      .replace(/{{COMPANY_NAME}}/g, companyName)
      .replace(/{{LOGO_URL}}/g, logoUrl);

    const to = [recipient];

    const mailOptions = {
      from: `"${companyName} Team" <${this.EMAIL_ADDRESSES.support}>`,
      to,
      subject,
      html,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (e) {
      this.logger.error(e);
      if (e.responseCode === 550) {
        throw new BadRequestException({ success: false, message: 'Invalid recipient address' });
      }
      throw new ServiceUnavailableException({
        success: false,
        message: 'Email service unavailable',
      });
    }
  }

  async sendRequestReservationEmailToAdmin(payload: CreateReservationDto) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long', // October
      day: 'numeric', // 1
      year: 'numeric', // 2025
    }).format(payload.date);

    const content = `Client Info :\n
    Username : ${payload.username}\n
    Email : ${payload.email}\n
    Phone Number : ${payload.phoneNumber}\n
    NbrGuests : \n
      \tMen : ${payload.nbrGuests.Men}
      \n\tWomen : ${payload.nbrGuests.Women}\n
    Date : ${formattedDate}\n
    
    `;
    const subject = payload.isVip ? 'VIP Reservation Request' : 'Reservation Request (Non VIP)';

    const response = await this.sendEmail({
      email: this.EMAIL_ADDRESSES.support,
      subject,
      content,
      ExceptionOptions: { throwable: true },
    });

    return response;
  }


  async sendContactMessageEmailToAdmin(payload:CreateContactDto){
    const content = `A Client has sent a contact message :\n
    Name : ${payload.name}\n
    Email : ${payload.email}\n
    Subject : ${payload.subject}\n
    Message : ${payload.message}\n
    `;
    const subject = `New Contact Message: ${payload.subject}`;

    const response = await this.sendEmail({
      email: this.EMAIL_ADDRESSES.support,
      subject,
      content,
      ExceptionOptions: { throwable: false },
    });

    return response;
  }
}

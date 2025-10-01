import { BadRequestException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { join } from 'path';
import ENV from 'src/config/env';

@Injectable()
export class EmailService {

  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

  private readonly EMAIL_ADDRESSES = {
    support: "support@volto.com",
  }

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

        this.transporter.verify().then(() => {
            this.logger.log('Connected to email server')
        }).catch((error) => {
          this.logger.fatal('Unable to connect to email server')
          this.logger.error(error)
          
        })
    }



  async sendEmail(email: string, subject: string, text: string) {
    await this.transporter.sendMail({
      from: this.EMAIL_ADDRESSES.support,
      to: email,
      subject: subject,
      text: text,
    });
  }

  async sendResetPasswordEmail({
    recipient,
    token,
  }: {
    recipient: string;
    token: string;
  }): Promise<void> {

    const templatePath = join(process.cwd(), 'templates','reset-password.html');
    let html = readFileSync(templatePath, "utf-8");

    const resetUrl = `http://localhost:${ENV.VITE_WEB_PORT}/reset-password?token=${token}` // ! to be change 

    const subject = 'Reset Your Password';
    const logoUrl = `http://localhost:${ENV.API_PORT}/api/public/logo.dark.png`; // ! kifkif
    const companyName = 'VOLTO';

    html = html
    .replace(/{{RESET_LINK}}/g, resetUrl)
    .replace(/{{COMPANY_NAME}}/g, companyName)
    .replace(/{{LOGO_URL}}/g, logoUrl);

    const to = [recipient]

    const mailOptions = {
        from: `"${companyName} Team" <${this.EMAIL_ADDRESSES.support}>`,
        to,
        subject,
        html,
    };
    try{
        await this.transporter.sendMail(mailOptions);

    }catch(e){
        this.logger.error(e)
        if (e.responseCode === 550) {
          throw new BadRequestException({ success: false, message: 'Invalid recipient address'});
        }
       throw new ServiceUnavailableException({ success: false, message: 'Email service unavailable'});
    }
  }
}

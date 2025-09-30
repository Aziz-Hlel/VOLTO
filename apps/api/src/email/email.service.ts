import { Injectable, Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { join } from 'path';
import ENV from 'src/config/env';

@Injectable()
export class EmailService {

  private readonly transported: nodemailer.Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

  constructor() {
    try {

        this.transported = nodemailer.createTransport({
            host: ENV.SMTP_HOST,
            port: ENV.SMTP_PORT,
            secure: ENV.SMTP_SECURE,
            auth: {
                user: ENV.SMTP_USER,
                pass: ENV.SMTP_PASS,
            },
        });
    }catch(e){
        this.logger.fatal('Unable to connect to email server')
        this.logger.error(e)
     }
    }


  private readonly logger = new Logger(EmailService.name);

  async sendEmail(email: string, subject: string, text: string) {
    await this.transported.sendMail({
      from: ENV.SMTP_USER,
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

    const templatePath = join(__dirname, '../assets/templates/reset-password.html');
    let html = readFileSync(templatePath, "utf-8");

    const resetUrl = `http://localhost:${ENV.API_PORT}/reset-password?token=${token}` // ! to be change 

    const subject = 'Reset Your Password';
    const logoUrl = `http://localhost:${ENV.API_PORT}/api/logo.png`; // ! kifkif
    const companyName = 'VOLTO';

    html = html
    .replace(/{{RESET_LINK}}/g, resetUrl)
    .replace(/{{COMPANY_NAME}}/g, companyName)
    .replace(/{{LOGO_URL}}/g, logoUrl);

    const to = [recipient]

    const mailOptions = {
        from: `"${companyName} Team" <${ENV.SMTP_USER}>`,
        to,
        subject,
        html,
    };
    try{
        await this.transported.sendMail(mailOptions);

    }catch(e){
        this.logger.error(e)
        throw 
    }
  }
}

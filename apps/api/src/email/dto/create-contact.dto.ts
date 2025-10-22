import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}

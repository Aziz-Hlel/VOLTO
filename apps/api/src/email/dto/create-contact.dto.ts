import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}

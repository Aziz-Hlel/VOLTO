import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class NbrGuestsDto {
  @IsNumber()
  @IsPositive()
  Men: number;

  @IsNumber()
  @IsPositive()
  Women: number;
}

export class CreateReservationDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsDefined({ message: 'nbrGuests is required' })
  @IsNotEmptyObject({}, { message: 'nbrGuests cannot be empty' })
  @ValidateNested()
  @Type(() => NbrGuestsDto)
  nbrGuests: NbrGuestsDto;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsBoolean()
  isVip: boolean = false;
}

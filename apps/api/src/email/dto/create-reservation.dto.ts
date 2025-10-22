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
  Matches,
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
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/^\+[0-9]+$/, { message: 'Phone number must start with + and contain only numbers' })
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

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsDefined,
  IsEmail,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';

export class NbrGuestsDto {
  @IsNumber()
  @Min(0)
  men: number;

  @IsNumber()
  @Min(0)
  women: number;
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

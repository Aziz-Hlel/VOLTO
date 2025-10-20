import { Gender, Role, Tier } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateObjectWithMediaRequestDto } from 'src/media/dto/MediaRequest.dto';

export class CreateStaffDto {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(30)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @IsEnum(Role, { message: 'Invalid Role' })
  role: Role;

  @IsOptional()
  @Matches(/^\+[0-9]+$/, { message: 'Phone number must start with + and contain only numbers' })
  phoneNumber?: string;

  @IsEnum(Gender, { message: 'Gender must be either M or F' })
  gender: Gender;

  @IsEnum(Tier, { message: 'Invalid Tier' })
  tier: Tier = Tier.SILVER;

  @ValidateNested()
  @Type(() => CreateObjectWithMediaRequestDto)
  avatar?: CreateObjectWithMediaRequestDto;
}

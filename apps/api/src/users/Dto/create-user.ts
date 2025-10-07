import { Gender, Role } from '@prisma/client';
import { Type } from 'class-transformer';
import {
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

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  username: string;

  @IsString()
  @MinLength(2)
  email: string;

  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only numbers' })
  phoneNumber?: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @IsEnum(Gender, { message: 'Gender must be either M or F' })
  gender: Gender;

  @IsEnum(Role, { message: 'Invalid Role' })
  role: Role;

  @ValidateNested()
  @Type(() => CreateObjectWithMediaRequestDto)
  avatar?: CreateObjectWithMediaRequestDto;
}

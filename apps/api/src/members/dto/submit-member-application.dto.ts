import { MembershipType } from '@prisma/client';
import {
  Equals,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class SubmitMemberApplicationDto {
  @IsEnum(MembershipType, { message: 'Please select a membership type' })
  membershipType: MembershipType;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @MaxLength(255, { message: 'Please enter a valid name' })
  fullName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid CPR / ID number' })
  cprId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid nationality' })
  nationality?: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'Please enter a valid date of birth',
    },
  )
  dateOfBirth: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  mobileNumber?: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  @MaxLength(255, { message: 'Please enter a valid email address' })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid name' })
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid relationship' })
  emergencyContactRelationship?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  emergencyContactMobileNumber?: string;

  @IsBoolean()
  @Equals(true, {
    message: 'You must agree to the member declaration',
  })
  declarationAgreed: boolean;

  @IsBoolean()
  @Equals(true, {
    message: 'You must acknowledge the Terms & Conditions',
  })
  termsAgreed: boolean;
}

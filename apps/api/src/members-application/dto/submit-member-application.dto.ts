import { MembershipType } from '@prisma/client';
import {
  Equals,
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
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

  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @MaxLength(255, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(255, { message: 'Please enter a valid password' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'CPR / ID number is required' })
  @MaxLength(255, { message: 'Please enter a valid CPR / ID number' })
  cprId: string;

  @IsString()
  @IsNotEmpty({ message: 'Nationality is required' })
  @MaxLength(255, { message: 'Please enter a valid nationality' })
  nationality: string;

  @IsDateString(
    {},
    {
      message: 'Please enter a valid date of birth',
    },
  )
  @IsNotEmpty({ message: 'Date of birth is required' })
  dateOfBirth: string;

  @IsString()
  @IsNotEmpty({ message: 'Mobile number is required' })
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  mobileNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Emergency contact name is required' })
  @MaxLength(255, { message: 'Please enter a valid name' })
  emergencyContactName: string;

  @IsString()
  @IsNotEmpty({ message: 'Emergency contact relationship is required' })
  @MaxLength(255, { message: 'Please enter a valid relationship' })
  emergencyContactRelationship: string;

  @IsString()
  @IsNotEmpty({ message: 'Emergency contact mobile number is required' })
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  emergencyContactMobileNumber: string;

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

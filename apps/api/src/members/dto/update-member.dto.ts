import { MembershipStatus, MembershipType } from '@prisma/client';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @MaxLength(255, { message: 'Please enter a valid name' })
  fullName: string;

  @IsString()
  @MaxLength(255, { message: 'Please enter a valid CPR / ID number' })
  cprId: string | null;

  @IsString()
  @MaxLength(255, { message: 'Please enter a valid nationality' })
  nationality: string | null;

  @IsDateString(
    {},
    {
      message: 'Please enter a valid date of birth',
    },
  )
  dateOfBirth: string;

  @IsString()
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  mobileNumber: string | null;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  @MaxLength(255, { message: 'Please enter a valid email address' })
  email: string;

  @IsString()
  @MaxLength(255, { message: 'Please enter a valid name' })
  emergencyContactName: string | null;

  @MaxLength(255, { message: 'Please enter a valid relationship' })
  emergencyContactRelationship: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  emergencyContactMobileNumber: string | null;

  // Membership Details
  @IsOptional()
  @IsString()
  membershipId: string | null;

  @IsOptional()
  @IsString()
  membershipNumber: string | null;

  // VOTLO Internal Data

  @IsOptional()
  @IsString()
  applicationReceivedBy: string | null;

  @IsOptional()
  @IsString()
  membershipNumberIssued: string | null;

  @IsOptional()
  @IsString()
  membershipCardSerialNumber: string | null;

  @IsOptional()
  @IsString()
  approvalBy: string | null;

  @IsOptional()
  @IsDateString()
  dateApproved: string | null;

  @IsOptional()
  @IsString()
  remarks: string | null;
}

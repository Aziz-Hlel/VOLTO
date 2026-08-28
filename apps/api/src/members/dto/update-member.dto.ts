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
  @IsEnum(MembershipType, { message: 'Please select a membership type' })
  membershipType: MembershipType;

  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @MaxLength(255, { message: 'Please enter a valid name' })
  fullName: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid CPR / ID number' })
  cprId: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid nationality' })
  nationality: string | null;

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
  mobileNumber: string | null;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  @MaxLength(255, { message: 'Please enter a valid email address' })
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid name' })
  emergencyContactName: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid relationship' })
  emergencyContactRelationship: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  emergencyContactMobileNumber: string | null;

  @IsOptional()
  @IsEnum(MembershipStatus, { message: 'Please select a valid membership status' })
  status: MembershipStatus;

  // Membership Details

  @IsOptional()
  @IsDateString()
  membershipStartDate: string | null;

  @IsOptional()
  @IsDateString()
  membershipExpiryDate: string | null;

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

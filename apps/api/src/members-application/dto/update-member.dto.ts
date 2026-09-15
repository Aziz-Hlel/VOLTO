import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
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

  @IsString()
  @MaxLength(255, { message: 'Please enter a valid mobile number' })
  emergencyContactMobileNumber: string | null;
}

import { MembershipDuration, MembershipType } from '@prisma/client';
import { IsEnum, IsString, MaxLength, ValidateIf } from 'class-validator';

export class ApproveMembershipDto {
  @IsEnum(MembershipType, { message: 'Please select a membership type' })
  membershipType: MembershipType;

  @IsEnum(MembershipDuration, { message: 'Please select a membership duration' })
  duration: MembershipDuration;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid receiver name' })
  applicationReceivedBy: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid membership number issued' })
  membershipNumberIssued: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid card serial number' })
  membershipCardSerialNumber: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid approver name' })
  approvalBy: string | null;

  @ValidateIf((_, value) => value !== null)
  @IsString()
  @MaxLength(255, { message: 'Please enter valid remarks' })
  remarks: string | null;
}

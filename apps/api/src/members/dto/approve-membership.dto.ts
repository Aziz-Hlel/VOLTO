import { MembershipDuration } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class ApproveMembershipDto {
  @IsEnum(MembershipDuration, { message: 'Please select a membership duration' })
  duration: MembershipDuration;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid receiver name' })
  applicationReceivedBy: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid membership number issued' })
  membershipNumberIssued: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid card serial number' })
  membershipCardSerialNumber: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter a valid approver name' })
  approvalBy: string | null;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'Please enter valid remarks' })
  remarks: string | null;
}

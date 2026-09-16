import { IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateMemberDto {
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

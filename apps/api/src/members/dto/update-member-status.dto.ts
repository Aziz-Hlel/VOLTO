import { MembershipStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateMemberStatusDto {
  @IsEnum(MembershipStatus, { message: 'Please select a membership status' })
  status: MembershipStatus;
}

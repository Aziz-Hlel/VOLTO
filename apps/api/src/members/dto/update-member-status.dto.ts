import { MembershipStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateMemberStatusDto {
  @IsNotEmpty({ message: 'Status is required' })
  @IsEnum(MembershipStatus, { message: 'Please provide a valid membership status' })
  status: MembershipStatus;
}

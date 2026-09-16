import { MembershipType } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateMembershipTypeDto {
  @IsEnum(MembershipType)
  membershipType: MembershipType;
}

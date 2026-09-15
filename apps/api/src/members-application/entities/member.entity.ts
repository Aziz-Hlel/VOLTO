import { MembershipType } from '@prisma/client';
import type { MemberResponse } from 'src/members/entities/member.entity';

export class MembershipApplicationResponse {
  id: string;
  membershipType: MembershipType;
  fullName: string;
  email: string;
  cprId: string | null;
  nationality: string | null;
  dateOfBirth: string | null;
  mobileNumber: string | null;
  emergencyContactName: string | null;
  emergencyContactRelationship: string | null;
  emergencyContactMobileNumber: string | null;
  seen: boolean;
  membership?: MemberResponse | null;
  createdAt: string;
  updatedAt: string;
}

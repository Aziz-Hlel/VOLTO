import { MembershipStatus, MembershipType } from '@prisma/client';

export class MinimalMembershipInfo {
  id: string;
  membershipUid: number;
  balance: number;
  status: MembershipStatus;
  type: MembershipType;
  expiryDate: string;
  fullName: string;
  email: string;
}

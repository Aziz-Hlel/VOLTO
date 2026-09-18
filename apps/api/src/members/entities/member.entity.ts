import { MembershipDuration, MembershipStatus } from '@prisma/client';
import type { MembershipApplicationResponse } from 'src/members-application/entities/member.entity';

export class MemberResponse {
  id: string;
  membershipUid: number;
  startDate: string;
  expiryDate: string;
  duration: MembershipDuration | null;
  membershipNumber: number;
  applicationReceivedBy: string | null;
  membershipNumberIssued: string | null;
  membershipCardSerialNumber: string | null;
  approvalBy: string | null;
  dateApproved: string;
  remarks: string | null;
  status: MembershipStatus;
  balance: number;
  currentPeriodEnd: string;
  membershipApplicationId: string;
  membershipApplication: MembershipApplicationResponse | null;
  createdAt: string;
  updatedAt: string;
}

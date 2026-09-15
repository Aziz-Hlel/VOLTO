import { MembershipDuration, MembershipStatus } from '@prisma/client';
import type { MembershipApplicationResponse } from 'src/members-application/entities/member.entity';

export class MemberResponse {
  id: string;
  membershipId: number;
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
  current_period_end: string;
  membershipApplicationId: string;
  membershipApplication?: MembershipApplicationResponse;
  createdAt: string;
  updatedAt: string;
}

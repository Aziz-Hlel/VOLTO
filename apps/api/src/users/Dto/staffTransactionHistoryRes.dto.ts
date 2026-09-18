import { MembershipType, TransactionType } from '@prisma/client';

export class StaffTransactionHistoryRes {
  id: string;

  amount: number;
  transactionType: TransactionType;
  note: string | null;

  member: {
    fullName: string;
    email: string;
    type: MembershipType;
    membershipUid: number;
  };

  createdAt: string;
}

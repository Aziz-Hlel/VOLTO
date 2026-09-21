import { MembershipType, Role, TransactionType } from '@prisma/client';

export class TransactionResponse {
  id: string;

  amount: number;
  transactionType: TransactionType;
  note: string | null;
  performedBy: { id: string; firstName: string; lastName: string; role: Role };
  member: {
    fullName: string;
    email: string;
    type: MembershipType;
    membershipUid: number;
  };
  createdAt: string;
}

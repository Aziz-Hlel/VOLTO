import { Role, TransactionType } from '@prisma/client';

export class FindAllMemberTransactionsResponseDto {
  id: string;

  amount: number;
  transactionType: TransactionType;
  note: string | null;
  performedBy: { id: string; firstName: string; lastName: string; role: Role };
  createdAt: string;
}

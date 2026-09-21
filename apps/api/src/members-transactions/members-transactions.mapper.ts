import { Prisma } from '@prisma/client';
import { FindAllMemberTransactionsResponseDto } from './dto/membership-transaction-response-dto';

export class MembersTransactionsMapper {
  static toResponse(
    transaction: Prisma.MemberTransactionHistoryGetPayload<{ include: { performedBy: true } }>,
  ): FindAllMemberTransactionsResponseDto {
    return {
      id: transaction.id,
      amount: transaction.amount,
      transactionType: transaction.transactionType,
      note: transaction.note,
      performedBy: {
        id: transaction.performedById,
        firstName: transaction.performedBy.firstName,
        lastName: transaction.performedBy.lastName,
        role: transaction.performedBy.role,
      },
      createdAt: transaction.createdAt.toISOString(),
    };
  }
}

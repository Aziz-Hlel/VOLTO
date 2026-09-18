import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MembershipStatus, Prisma, TransactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { CreateMembersTransactionDto } from './dto/create-members-transaction.dto';
import { GetTransactionsQueryDto } from './dto/find-all-transactions-cursor-dto';
import { MembersTransactionsMapper } from './members-transactions.mapper';

@Injectable()
export class MembersTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    membershipId: string,
    createMembersTransactionDto: CreateMembersTransactionDto,
    user: AuthUser,
  ) {
    const membership = await this.prisma.membership.findUnique({
      where: {
        id: membershipId,
      },
    });

    if (!membership) {
      throw new BadRequestException('Membership not found');
    }
    if (membership.status !== MembershipStatus.ACTIVE) {
      throw new BadRequestException('Membership is not active');
    }

    const amount =
      createMembersTransactionDto.type === TransactionType.EARN
        ? createMembersTransactionDto.amount
        : -createMembersTransactionDto.amount;

    const newBalance = membership.balance + amount;

    if (newBalance < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.memberTransactionHistory.create({
        data: {
          membershipId: membershipId,
          amount,
          transactionType: createMembersTransactionDto.type,
          note: createMembersTransactionDto.note,
          performedById: user.id,
        },
      });
      await tx.membership.update({
        where: {
          id: membershipId,
        },
        data: {
          balance: newBalance,
        },
      });
    });
    return {
      success: true,
    };
  }

  async createByMembershipUid(
    membershipUid: number,
    createMembersTransactionDto: CreateMembersTransactionDto,
    user: AuthUser,
  ) {
    const membership = await this.prisma.membership.findUnique({
      where: {
        membershipUid: membershipUid,
      },
      select: {
        id: true,
        status: true,
        balance: true,
      },
    });
    if (!membership) {
      throw new BadRequestException('Membership not found');
    }
    if (membership.status !== MembershipStatus.ACTIVE) {
      throw new BadRequestException('Membership is not active');
    }

    const amount =
      createMembersTransactionDto.type === TransactionType.EARN
        ? createMembersTransactionDto.amount
        : -createMembersTransactionDto.amount;

    const newBalance = membership.balance + amount;

    if (newBalance < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.memberTransactionHistory.create({
        data: {
          membershipId: membership.id,
          amount,
          transactionType: createMembersTransactionDto.type,
          note: createMembersTransactionDto.note,
          performedById: user.id,
        },
      });
      await tx.membership.update({
        where: {
          id: membership.id,
        },
        data: {
          balance: newBalance,
        },
      });
    });
    return {
      success: true,
    };
  }

  async findAllByMembershipId(membershipId: string, query: GetTransactionsQueryDto) {
    const take = query.limit + 1;

    const where: Prisma.MemberTransactionHistoryWhereInput = {
      membershipId: membershipId,
    };

    try {
      const transactionsQuery = this.prisma.memberTransactionHistory.findMany({
        where,
        include: {
          performedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              role: true,
            },
          },
        },
        ...(query.transactionId && { cursor: { id: query.transactionId } }),
        orderBy: { createdAt: 'desc' },
        take,
      });

      const transactionsQueryResponse = await transactionsQuery;

      const lastItem = transactionsQueryResponse[query.limit];
      const nextCursor = lastItem?.id || null;
      const transactionsData = transactionsQueryResponse.slice(0, query.limit);
      const data = transactionsData.map(MembersTransactionsMapper.toResponse);

      return {
        data,
        nextCursor,
      };
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }
}

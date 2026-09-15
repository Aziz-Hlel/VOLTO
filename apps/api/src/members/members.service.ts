import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MembershipStatus, TransactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { ApproveMembershipDto } from './dto/approve-membership.dto';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { membershipDurationToDays } from './utils/membershipDurationToDays';
import { membershipTypeBalance } from './utils/membershipTypeBalance';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  create(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  findAll() {
    return `This action returns all members`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }

  approveApplication = async (id: string, user: AuthUser, payload: ApproveMembershipDto) => {
    const membershipApplication = await this.prisma.membershipApplication.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        membershipType: true,
        membership: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!membershipApplication) {
      throw new NotFoundException('Membership application not found');
    }
    if (membershipApplication.membership) {
      throw new BadRequestException('Membership application already exists');
    }

    const balance = membershipTypeBalance[membershipApplication.membershipType];
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + membershipDurationToDays[payload.duration]);

    const current_period_end = new Date();
    current_period_end.setDate(expiryDate.getDate() + 30);

    await this.prisma.$transaction(async (tx) => {
      const membership = await tx.membership.create({
        data: {
          membershipApplicationId: id,
          status: MembershipStatus.ACTIVE,
          balance: balance,

          duration: payload.duration,
          applicationReceivedBy: payload.applicationReceivedBy,
          membershipNumberIssued: payload.membershipNumberIssued,
          membershipCardSerialNumber: payload.membershipCardSerialNumber,
          approvalBy: payload.approvalBy,
          remarks: payload.remarks,
          startDate: new Date(),
          expiryDate: expiryDate,
          current_period_end,
        },
      });
      await tx.memberTransactionHistory.create({
        data: {
          membershipId: membership.id,
          amount: balance,
          transactionType: TransactionType.RENEWAL,
          note: 'Membership renewal',
          performedById: user.id,
        },
      });
    });

    return { success: true };
  };
}

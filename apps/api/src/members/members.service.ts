import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MembershipStatus, TransactionType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { toCalendarDate } from 'src/utils/dayjs';
import { ApproveMembershipDto } from './dto/approve-membership.dto';
import { UpdateMemberStatusDto } from './dto/update-member-status.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MinimalMembershipInfo } from './entities/minimal-member-info';
import { membershipDurationToDays } from './utils/membershipDurationToDays';
import { membershipTypeBalance } from './utils/membershipTypeBalance';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  updateDetails = async (id: string, updateMemberDto: UpdateMemberDto) => {
    try {
      const membership = await this.prisma.membership.findUnique({
        where: {
          id,
        },
      });
      if (!membership) {
        throw new NotFoundException('Membership not found');
      }
      await this.prisma.membership.update({
        where: {
          id,
        },
        data: updateMemberDto,
      });
      return { success: true, message: 'Membership updated successfully' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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

    const balance = membershipTypeBalance[payload.membershipType];
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + membershipDurationToDays[payload.duration]);

    const currentPeriodEnd = new Date();
    currentPeriodEnd.setDate(expiryDate.getDate() + 30);

    await this.prisma.$transaction(async (tx) => {
      await this.prisma.membershipApplication.update({
        where: { id },
        data: {
          membershipType: payload.membershipType,
        },
      });

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
          currentPeriodEnd: currentPeriodEnd,
        },
      });
      await tx.memberTransactionHistory.create({
        data: {
          membershipId: membership.id,
          amount: balance,
          transactionType: TransactionType.RENEWAL,
          note: 'Membership Initialization',
          performedById: user.id,
        },
      });
    });

    return { success: true };
  };

  renewApplication = async (id: string, user: AuthUser, payload: ApproveMembershipDto) => {
    const membership = await this.prisma.membership.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        membershipApplication: {
          select: {
            id: true,
            membershipType: true,
          },
        },
      },
    });

    if (!membership) {
      throw new NotFoundException('Membership not found');
    }

    if (membership.status !== MembershipStatus.EXPIRED) {
      throw new BadRequestException('Membership is not expired yet');
    }

    const balance = membershipTypeBalance[payload.membershipType];
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + membershipDurationToDays[payload.duration]);

    const currentPeriodEnd = new Date();
    currentPeriodEnd.setDate(expiryDate.getDate() + 30);

    await this.prisma.$transaction(async (tx) => {
      const updatedMembership = await tx.membership.update({
        where: {
          id: membership.id,
        },
        data: {
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
          currentPeriodEnd: currentPeriodEnd,
          membershipApplication: {
            update: {
              membershipType: payload.membershipType,
            },
          },
        },
      });
      await tx.memberTransactionHistory.create({
        data: {
          membershipId: updatedMembership.id,
          amount: balance,
          transactionType: TransactionType.RENEWAL,
          note: 'Membership renewal',
          performedById: user.id,
        },
      });
    });

    return { success: true };
  };

  updateStatus = async (id: string, payload: UpdateMemberStatusDto) => {
    const membership = await this.prisma.membership.findUnique({
      where: {
        id,
      },
    });
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }
    await this.prisma.membership.update({
      where: {
        id,
      },
      data: payload,
    });
    return { success: true, message: 'Membership status updated successfully' };
  };

  findByMembershipUid = async (membershipUid: number) => {
    const membershipQuery = await this.prisma.membership.findUnique({
      where: {
        membershipUid,
      },
      select: {
        id: true,
        membershipUid: true,
        balance: true,
        status: true,
        expiryDate: true,
        membershipApplication: {
          select: {
            fullName: true,
            email: true,
            membershipType: true,
          },
        },
      },
    });

    if (!membershipQuery) {
      throw new NotFoundException('Membership not found');
    }

    const membership: MinimalMembershipInfo = {
      id: membershipQuery.id,
      membershipUid: membershipQuery.membershipUid,
      balance: membershipQuery.balance,
      status: membershipQuery.status,
      type: membershipQuery.membershipApplication.membershipType,
      expiryDate: toCalendarDate(membershipQuery.expiryDate),
      fullName: membershipQuery.membershipApplication.fullName,
      email: membershipQuery.membershipApplication.email,
    };

    return { success: true, data: membership };
  };
}

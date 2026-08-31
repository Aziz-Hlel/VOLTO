import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MembershipStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { toCalendarDate } from 'src/utils/dayjs';
import { GetMembersQuery, SortMember } from './dto/get-members-query.dto';
import { SubmitMemberApplicationDto } from './dto/submit-member-application.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(createMemberDto: SubmitMemberApplicationDto) {
    const memberEmail = await this.prisma.membershipApplication.findUnique({
      where: {
        email: createMemberDto.email,
      },
      select: {
        id: true,
      },
    });

    if (memberEmail) {
      throw new ConflictException('Member email already exists');
    }

    const member = await this.prisma.membershipApplication.create({
      data: {
        email: createMemberDto.email,
        fullName: createMemberDto.fullName,
        cprId: createMemberDto.cprId,
        nationality: createMemberDto.nationality,
        dateOfBirth: createMemberDto.dateOfBirth ? new Date(createMemberDto.dateOfBirth) : null,
        mobileNumber: createMemberDto.mobileNumber,
        emergencyContactName: createMemberDto.emergencyContactName,
        emergencyContactRelationship: createMemberDto.emergencyContactRelationship,
        emergencyContactMobileNumber: createMemberDto.emergencyContactMobileNumber,
        membershipType: createMemberDto.membershipType,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        email: createMemberDto.email,
      },
      select: {
        id: true,
      },
    });

    return { success: true, userExists: !!user };
  }

  async findAll(query: GetMembersQuery) {
    const skip = (query.page - 1) * query.limit;
    const take = query.limit;

    const where: Prisma.MembershipApplicationWhereInput = {
      OR: query.search
        ? [
            { fullName: { contains: query.search, mode: 'insensitive' } },
            { email: { contains: query.search, mode: 'insensitive' } },
          ]
        : undefined,
    };

    const orderBy = () => {
      if (query.sort) {
        const sort = String(query.sort) as keyof SortMember;
        return {
          [sort]: query.order ?? 'asc',
        };
      }
      return {
        createdAt: 'desc' as const,
      };
    };

    try {
      const membersQuery = this.prisma.membershipApplication.findMany({
        where,
        select: {
          id: true,
          membershipType: true,
          fullName: true,
          email: true,
          cprId: true,
          nationality: true,
          seen: true,
          status: true,
          createdAt: true,
        },
        orderBy: orderBy(),
        skip,
        take,
      });

      const countQuery = this.prisma.membershipApplication.count({
        where,
      });

      const [members, count] = await Promise.all([membersQuery, countQuery]);

      return {
        data: members,
        pagination: {
          total: count,
          page: query.page,
          totalPages: Math.ceil(count / query.limit),
          limit: query.limit,
        },
      };
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }

  async findOne(id: string) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }
    return {
      ...member,
      dateOfBirth: toCalendarDate(member.dateOfBirth),
      membershipStartDate: toCalendarDate(member.membershipStartDate),
      membershipExpiryDate: toCalendarDate(member.membershipExpiryDate),
      dateApproved: toCalendarDate(member.dateApproved),
      createdAt: toCalendarDate(member.createdAt),
      updatedAt: toCalendarDate(member.updatedAt),
    };
  }

  async findOneByEmail(email: string) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { email },
    });


    if (!member) {
      throw new NotFoundException('Member application not found');
    }
    return {
      ...member,
      dateOfBirth: toCalendarDate(member.dateOfBirth),
      membershipStartDate: toCalendarDate(member.membershipStartDate),
      membershipExpiryDate: toCalendarDate(member.membershipExpiryDate),
      dateApproved: toCalendarDate(member.dateApproved),
      createdAt: toCalendarDate(member.createdAt),
      updatedAt: toCalendarDate(member.updatedAt),
    };
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }

    if (updateMemberDto.email && updateMemberDto.email !== member.email) {
      const emailExists = await this.prisma.membershipApplication.findUnique({
        where: { email: updateMemberDto.email },
      });
      if (emailExists) {
        throw new ConflictException('Member email already exists');
      }
    }

    try {
      const updatedMember = await this.prisma.membershipApplication.update({
        where: { id },
        data: {
          membershipType: updateMemberDto.membershipType,
          fullName: updateMemberDto.fullName,
          email: updateMemberDto.email,
          cprId: updateMemberDto.cprId,
          status: updateMemberDto.status,
          nationality: updateMemberDto.nationality,
          dateOfBirth: updateMemberDto.dateOfBirth ? new Date(updateMemberDto.dateOfBirth) : null,
          mobileNumber: updateMemberDto.mobileNumber,
          emergencyContactName: updateMemberDto.emergencyContactName,
          emergencyContactRelationship: updateMemberDto.emergencyContactRelationship,
          emergencyContactMobileNumber: updateMemberDto.emergencyContactMobileNumber,

          membershipId: updateMemberDto.membershipId,
          membershipStartDate: updateMemberDto.membershipStartDate
            ? new Date(updateMemberDto.membershipStartDate)
            : null,
          membershipExpiryDate: updateMemberDto.membershipExpiryDate
            ? new Date(updateMemberDto.membershipExpiryDate)
            : null,
          membershipNumber: updateMemberDto.membershipNumber,
          applicationReceivedBy: updateMemberDto.applicationReceivedBy,
          membershipNumberIssued: updateMemberDto.membershipNumberIssued,
          membershipCardSerialNumber: updateMemberDto.membershipCardSerialNumber,
          approvalBy: updateMemberDto.approvalBy,
          dateApproved: updateMemberDto.dateApproved
            ? new Date(updateMemberDto.dateApproved)
            : null,
          remarks: updateMemberDto.remarks,
        },
      });

      return updatedMember;
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }

  async updateStatus(id: string, status: MembershipStatus) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }

    try {
      const updated = await this.prisma.membershipApplication.update({
        where: { id },
        data: { status },
      });

      return updated;
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }

  async remove(id: string) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }

    try {
      const deleted = await this.prisma.membershipApplication.delete({
        where: { id },
      });

      return deleted;
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }
}

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MembershipStatus, Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { GetMembersQuery, SortMember } from './dto/get-members-query.dto';
import { SubmitAuthonticatedMemberApplicationDto } from './dto/submit-auth-member-application.dto';
import { SubmitMemberApplicationDto } from './dto/submit-member-application.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembershipApplicationMapper } from './mappers/membership-application.mapper';

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

    await this.prisma.membershipApplication.create({
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

    if (!user) {
      const hashedPassword = await bcrypt.hash(createMemberDto.password, 10);
      await this.prisma.user.create({
        data: {
          email: createMemberDto.email,
          password: hashedPassword,
          firstName: createMemberDto.fullName.split(' ')[0],
          lastName: createMemberDto.fullName.split(' ').slice(1).join(' '),
          role: Role.USER,
          phoneNumber: createMemberDto.mobileNumber,
        },
      });
    }

    return { success: true, userExists: !!user };
  }

  async createAuthonticatedUser(
    createMemberDto: SubmitAuthonticatedMemberApplicationDto,
    user: AuthUser,
  ) {
    const memberEmail = await this.prisma.membershipApplication.findUnique({
      where: {
        email: user.email,
      },
      select: {
        id: true,
      },
    });

    if (memberEmail) {
      throw new ConflictException('Member email already exists');
    }

    await this.prisma.membershipApplication.create({
      data: {
        email: user.email,
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

    return { success: true };
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
        const sort = query.sort as SortMember;
        if (sort === 'status') {
          return {
            membership: {
              status: query.order ?? 'asc',
            },
          };
        }
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
        include: {
          membership: true,
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
        data: members.map((member) => MembershipApplicationMapper.toResponse(member)),
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
      include: {
        membership: true,
      },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }
    return MembershipApplicationMapper.toResponse(member);
  }

  async findOneByEmail(email: string) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { email },
      include: {
        membership: true,
      },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }
    return MembershipApplicationMapper.toResponse(member);
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { id },
      select: { id: true, email: true },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }

    if (updateMemberDto.email && updateMemberDto.email !== member.email) {
      const emailExists = await this.prisma.membershipApplication.findUnique({
        where: { email: updateMemberDto.email },
        select: { id: true },
      });
      if (emailExists) {
        throw new ConflictException('Member email already exists');
      }
    }

    try {
      const updatedMember = await this.prisma.membershipApplication.update({
        where: { id },
        data: {
          fullName: updateMemberDto.fullName,
          email: updateMemberDto.email,
          cprId: updateMemberDto.cprId,
          nationality: updateMemberDto.nationality,
          dateOfBirth: updateMemberDto.dateOfBirth ? new Date(updateMemberDto.dateOfBirth) : null,
          mobileNumber: updateMemberDto.mobileNumber,
          emergencyContactName: updateMemberDto.emergencyContactName,
          emergencyContactRelationship: updateMemberDto.emergencyContactRelationship,
          emergencyContactMobileNumber: updateMemberDto.emergencyContactMobileNumber,
        },
      });

      return { success: true };
    } catch (e) {
      console.log(e.message);
      throw new InternalServerErrorException(e.message);
    }
  }

  async updateStatus(id: string, status: MembershipStatus) {
    const member = await this.prisma.membershipApplication.findUnique({
      where: { id },
      include: {
        membership: true,
      },
    });

    if (!member) {
      throw new NotFoundException('Member application not found');
    }

    if (!member.membership) {
      throw new NotFoundException('Membership not found for application');
    }

    try {
      const updated = await this.prisma.membership.update({
        where: {
          membershipApplicationId: id,
        },
        data: {
          status,
        },
        include: {
          membershipApplication: true,
        },
      });

      return MembershipApplicationMapper.toResponse({
        ...updated.membershipApplication,
        membership: updated,
      });
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

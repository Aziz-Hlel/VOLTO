import type { Prisma } from '@prisma/client';
import { MemberMapper } from 'src/members/mappers/member.mapper';
import { toCalendarDate } from 'src/utils/dayjs';
import type { MembershipApplicationResponse } from '../entities/member.entity';

type MembershipApplication = Prisma.MembershipApplicationGetPayload<{
  include: {
    membership: true;
  };
}>;

type MembershipApplicationWithoutMembership = Prisma.MembershipApplicationGetPayload<{}>;

export class MembershipApplicationMapper {
  static toResponse(
    application: MembershipApplication | MembershipApplicationWithoutMembership,
  ): MembershipApplicationResponse {
    return {
      id: application.id,
      membershipType: application.membershipType,
      fullName: application.fullName,
      email: application.email,
      cprId: application.cprId,
      nationality: application.nationality,
      dateOfBirth: toCalendarDate(application.dateOfBirth),
      mobileNumber: application.mobileNumber,
      emergencyContactName: application.emergencyContactName,
      emergencyContactRelationship: application.emergencyContactRelationship,
      emergencyContactMobileNumber: application.emergencyContactMobileNumber,
      seen: application.seen,
      membership: this.hasMembership(application)
        ? application.membership && MemberMapper.toResponse(application.membership)
        : undefined,
      createdAt: toCalendarDate(application.createdAt),
      updatedAt: toCalendarDate(application.updatedAt),
    };
  }

  private static hasMembership(
    application: MembershipApplication | MembershipApplicationWithoutMembership,
  ): application is MembershipApplication {
    return 'membership' in application;
  }
}

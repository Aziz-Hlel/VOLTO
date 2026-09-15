import type { Prisma } from '@prisma/client';
import type { MembershipApplicationResponse } from 'src/members-application/entities/member.entity';
import { toCalendarDate } from 'src/utils/dayjs';
import type { MemberResponse } from '../entities/member.entity';

type Member = Prisma.MembershipGetPayload<{
  include: {
    membershipApplication: true;
  };
}>;

type MemberWithoutApplication = Prisma.MembershipGetPayload<{}>;

export class MemberMapper {
  static toResponse(member: Member | MemberWithoutApplication): MemberResponse {
    return {
      id: member.id,
      membershipId: member.membershipId,
      startDate: toCalendarDate(member.startDate),
      expiryDate: toCalendarDate(member.expiryDate),
      duration: member.duration,
      membershipNumber: member.membershipNumber,
      applicationReceivedBy: member.applicationReceivedBy,
      membershipNumberIssued: member.membershipNumberIssued,
      membershipCardSerialNumber: member.membershipCardSerialNumber,
      approvalBy: member.approvalBy,
      dateApproved: toCalendarDate(member.dateApproved),
      remarks: member.remarks,
      status: member.status,
      balance: member.balance,
      current_period_end: toCalendarDate(member.current_period_end),
      membershipApplicationId: member.membershipApplicationId,
      membershipApplication: this.hasApplication(member)
        ? this.toApplicationResponse(member.membershipApplication)
        : null,
      createdAt: toCalendarDate(member.createdAt),
      updatedAt: toCalendarDate(member.updatedAt),
    };
  }

  private static hasApplication(member: Member | MemberWithoutApplication): member is Member {
    return 'membershipApplication' in member;
  }

  private static toApplicationResponse(
    application: Member['membershipApplication'],
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
      createdAt: toCalendarDate(application.createdAt),
      updatedAt: toCalendarDate(application.updatedAt),
    };
  }
}

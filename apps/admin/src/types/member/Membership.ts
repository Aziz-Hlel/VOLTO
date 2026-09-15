import type { MembershipDuration, MembershipStatus, MembershipType } from "../enums/enums";

export type MembershipApplication = {
  id: string;
  membershipType: MembershipType;
  fullName: string;
  email: string;
  cprId: string | null;
  nationality: string | null;
  dateOfBirth: string | null;
  mobileNumber: string | null;
  emergencyContactName: string | null;
  emergencyContactRelationship: string | null;
  emergencyContactMobileNumber: string | null;
  seen: boolean;
  membership: MemberResponse | null;
  createdAt: string;
  updatedAt: string;
};

export type MemberResponse = {
  id: string;
  membershipId: number;
  startDate: string;
  expiryDate: string;
  duration: MembershipDuration | null;
  membershipNumber: number;
  applicationReceivedBy: string | null;
  membershipNumberIssued: string | null;
  membershipCardSerialNumber: string | null;
  approvalBy: string | null;
  dateApproved: string;
  remarks: string | null;
  status: MembershipStatus;
  balance: number;
  current_period_end: string;
  membershipApplicationId: string;
  createdAt: string;
  updatedAt: string;
};

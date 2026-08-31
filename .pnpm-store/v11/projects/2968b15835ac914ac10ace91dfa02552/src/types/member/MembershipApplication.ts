import type { MembershipStatus, MembershipType } from "../enums/enums";

export type MembershipApplication = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  membershipType: MembershipType;
  fullName: string;
  cprId: string | null;
  nationality: string | null;
  dateOfBirth: Date | null;
  mobileNumber: string | null;
  emergencyContactName: string | null;
  emergencyContactRelationship: string | null;
  emergencyContactMobileNumber: string | null;
  seen: boolean;
  status: MembershipStatus;
};

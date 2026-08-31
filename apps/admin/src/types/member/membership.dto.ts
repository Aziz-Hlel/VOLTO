import type { MembershipStatus, MembershipType } from "../enums/enums";

export type Membership = {
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
  membershipId: string | null;
  membershipStartDate: string | null;
  membershipExpiryDate: string | null;
  membershipNumber: string | null;
  applicationReceivedBy: string | null;
  membershipNumberIssued: string | null;
  membershipCardSerialNumber: string | null;

  // VOTLO Internal Data
  approvalBy: string | null;
  dateApproved: string | null;
  remarks: string | null;

  createdAt: string;
  updatedAt: string;
  status: MembershipStatus;
};

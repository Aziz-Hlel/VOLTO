import type { MembershipStatus, MembershipType } from "../enums/enums";

export class UpdateMemberDto {
    // Personal Information
    membershipType: MembershipType;
    fullName: string;
    cprId?: string;
    nationality?: string;
    dateOfBirth: string;
    mobileNumber?: string;
    email: string;
    emergencyContactName?: string;
    emergencyContactRelationship?: string;
    emergencyContactMobileNumber?: string;

    // Membership Details
    status?: MembershipStatus;
    membershipStartDate?: string;
    membershipExpiryDate?: string;
    membershipNumber?: string;

    // VOTLO Internal Data
    applicationReceivedBy?: string;
    membershipNumberIssued?: string;
    membershipCardSerialNumber?: string;
    approvalBy?: string;
    dateApproved?: string;
    remarks?: string;
}

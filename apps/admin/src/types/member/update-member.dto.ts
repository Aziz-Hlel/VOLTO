export class UpdateMemberDto {
    // Personal Information
    fullName: string;
    cprId: string | null;
    nationality: string | null;
    dateOfBirth: string;
    mobileNumber: string | null;
    email: string;
    emergencyContactName: string | null;
    emergencyContactRelationship: string | null;
    emergencyContactMobileNumber: string | null;
}

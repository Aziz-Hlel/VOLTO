export const membershipStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED",
} as const;
export type MembershipStatus = (typeof membershipStatus)[keyof typeof membershipStatus];

export const membershipType = {
  REGULAR: "REGULAR",
  VIP: "VIP",
} as const;
export type MembershipType = (typeof membershipType)[keyof typeof membershipType];

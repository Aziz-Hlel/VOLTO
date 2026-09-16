export const membershipStatus = {
  ACTIVE: "ACTIVE",
  REJECTED: "REJECTED",
  SUSPENDED: "SUSPENDED",
  EXPIRED: "EXPIRED",
} as const;
export type MembershipStatus = (typeof membershipStatus)[keyof typeof membershipStatus];

export const membershipType = {
  REGULAR: "REGULAR",
  VIP: "VIP",
} as const;
export type MembershipType = (typeof membershipType)[keyof typeof membershipType];

export const membershipDuration = {
  MONTH: "MONTH",
  QUARTER: "QUARTER",
  YEAR: "YEAR",
} as const;
export type MembershipDuration = (typeof membershipDuration)[keyof typeof membershipDuration];

export const transactionType = {
  REDEEM: "REDEEM",
  RENEWAL: "RENEWAL",
  EARN: "EARN",
} as const;

export type TransactionType = (typeof transactionType)[keyof typeof transactionType];

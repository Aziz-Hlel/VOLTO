import { MembershipDuration } from '@prisma/client';

export const membershipDurationToDays: Record<MembershipDuration, number> = {
  MONTH: 30 * 24 * 60 * 60 * 1000,
  QUARTER: 90 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
};

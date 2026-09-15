import { MembershipDuration } from '@prisma/client';

export const membershipDurationToDays: Record<MembershipDuration, number> = {
  MONTH: 30,
  QUARTER: 90,
  YEAR: 365,
};

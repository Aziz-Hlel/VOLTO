import { MembershipType } from '@prisma/client';

export const membershipTypeBalance: Record<MembershipType, number> = {
  REGULAR: 600,
  VIP: 2000,
};

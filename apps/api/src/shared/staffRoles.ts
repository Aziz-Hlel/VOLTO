import { Role } from '@prisma/client';

export const STAFF_ROLES = [
  Role.ADMIN,
  Role.WAITER,
  Role.SUPER_ADMIN,
  Role.MEDIA_MANAGER,
  Role.SECURITY,
  Role.CASHIER,
];

export type StaffRole = (typeof STAFF_ROLES)[number];

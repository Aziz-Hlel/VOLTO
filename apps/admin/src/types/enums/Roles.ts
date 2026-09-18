export const Roles = {
  SYSTEM: "SYSTEM",
  WAITER: "WAITER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  CASHIER: "CASHIER",
  MEDIA_MANAGER: "MEDIA_MANAGER",
  SECURITY: "SECURITY",
} as const;

export type Roles = keyof typeof Roles;

export const AdminRoles = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type AdminRoles = keyof typeof AdminRoles;

export const StaffRoles = {
  WAITER: "WAITER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  CASHIER: "CASHIER",
  MEDIA_MANAGER: "MEDIA_MANAGER",
  SECURITY: "SECURITY",
} as const;

export type StaffRoles = keyof typeof StaffRoles;

export const roleMapperToDisplay: Record<Roles, string> = {
  [Roles.WAITER]: "Waiter",
  [Roles.ADMIN]: "Admin",
  [Roles.SUPER_ADMIN]: "Super Admin",
  [Roles.CASHIER]: "Cashier",
  [Roles.MEDIA_MANAGER]: "Media Manager",
  [Roles.SECURITY]: "Security",
  [Roles.SYSTEM]: "System",
} as const;

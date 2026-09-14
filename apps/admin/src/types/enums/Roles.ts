export const Roles = {
  WAITER: "WAITER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  CASHIER: "CASHIER",
  MEDIA_MANAGER: "MEDIA_MANAGER",
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
} as const;

export type StaffRoles = keyof typeof StaffRoles;

export const Roles = {
  WAITER: "WAITER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
} as const;

export type Roles = keyof typeof Roles;

import type { Roles } from "./enums/Roles";
import type { Tier } from "./enums/Tier";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Roles;
  gender: "M" | "F";
  tier: Tier;
};

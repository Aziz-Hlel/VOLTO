import type { Roles } from "./enums/Roles";
import type { Tier } from "./enums/Tier";

export type User = {
  id: string;
  username: string;
  email: string;
  role: Roles;
  gender: "M" | "F";
  tier: Tier;
};

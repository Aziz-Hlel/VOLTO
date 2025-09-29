import type { Role } from "./enums/Roles";
import type { Tier } from "./enums/Tier";

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role;
  gender: "M" | "F";
  tier: Tier;
};

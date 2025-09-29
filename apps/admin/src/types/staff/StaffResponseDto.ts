import type { Gender } from "../enums/Gender";
import type { Role } from "../enums/Roles";
import type { Tier } from "../enums/Tier";

export type StaffResponseDto = {
  id: string;
  email: string;
  username: string;
  role: Role;
  phoneNumber?: string;
  gender: Gender;
  tier: Tier;
  createdAt: Date;
  updatedAt: Date;
};

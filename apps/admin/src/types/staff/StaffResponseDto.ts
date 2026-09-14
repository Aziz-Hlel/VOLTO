import type { Gender } from "../enums/Gender";
import type { StaffRoles } from "../enums/Roles";
import type { Tier } from "../enums/Tier";

export type StaffResponseDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: StaffRoles;
  phoneNumber?: string;
  gender: Gender;
  tier: Tier;
  avatar: {
    s3Key: string;
    url: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

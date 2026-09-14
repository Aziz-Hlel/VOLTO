import type { Gender } from "../enums/Gender";
import type { StaffRoles } from "../enums/Roles";
import type { Tier } from "../enums/Tier";

export type StaffRequestDto = {
  email: string;
  firstName: string;
  lastName: string;
  role: StaffRoles;
  phoneNumber?: string;
  gender: Gender;
  tier: Tier;
  password?: string;
  repeatPassword?: string;
  avatar?:
    | {
        s3Key: string;
        url: string;
      }
    | undefined;
};

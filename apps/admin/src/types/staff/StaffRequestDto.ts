import type { Gender } from "../enums/Gender";
import type { Roles } from "../enums/Roles";
import type { Tier } from "../enums/Tier";

export type StaffRequestDto = {
  email: string;
  username: string;
  role: "WAITER" | "ADMIN" | "SUPER_ADMIN";
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

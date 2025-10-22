import type { Gender, Role, Tier } from '@prisma/client';

export class UserResponseDto {
  id: string;

  email: string;

  gender: Gender;

  phoneNumber?: string;

  username: string; // ! to satisfy the mobile old version

  firstName: string;

  lastName: string;

  role: Role;

  tier: Tier;

  avatar?: {
    s3Key: string;
    url: string;
  };
}

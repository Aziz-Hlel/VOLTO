import type { Gender, Role, Tier } from '@prisma/client';

export class UserResponseDto {
  id: string;

  email: string;

  gender: Gender;

  phoneNumber?: string;

  firstName: string;

  lastName: string;

  role: Role;

  tier: Tier;

  avatar?: {
    s3Key: string;
    url: string;
  };
}

import type { Gender, Role, Tier, User } from '@prisma/client';

export class StaffResponseDto {
  id: string;
  email: string;
  username: string;
  role: Role;
  phoneNumber?: string;
  gender: Gender;
  tier: Tier;
  createdAt: Date;
  updatedAt: Date;

  constructor(user: User) {
    Object.assign(this, user); // apply the utility
  }
}

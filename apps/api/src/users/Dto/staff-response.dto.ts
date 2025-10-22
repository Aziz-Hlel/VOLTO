import type { Gender, Role, Tier, User } from '@prisma/client';

export class StaffResponseDto {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  role: Role;

  phoneNumber?: string;

  gender: Gender;

  tier: Tier;

  username: string; // ! to satisfy the mobile old version

  createdAt: Date;

  updatedAt: Date;

  avatar?: {
    s3Key: string;
    url: string;
  };

  constructor(user: User) {
    Object.assign(this, user); // apply the utility
    this.username = `${this.firstName} ${this.lastName}`; // ! to satisfy the mobile old version
  }
}

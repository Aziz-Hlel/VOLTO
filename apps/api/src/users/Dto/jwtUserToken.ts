import type { Role } from '@prisma/client';

export class jwtUserToken {
  sub: string;

  email: string;

  firstName: string;

  lastName: string;

  username: string; // ! to satisfy the mobile old version

  role: Role;
}

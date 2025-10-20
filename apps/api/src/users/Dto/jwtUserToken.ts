import type { Role } from '@prisma/client';

export class jwtUserToken {
  sub: string;

  email: string;

  firstName: string;

  lastName: string;

  role: Role;
}

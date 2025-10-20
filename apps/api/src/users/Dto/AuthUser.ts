import type { Role } from '@prisma/client';

export class AuthUser {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  role: Role;
}

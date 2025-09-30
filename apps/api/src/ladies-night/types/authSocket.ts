import type { Socket } from 'socket.io';
import type { AuthUser } from 'src/users/Dto/AuthUser';

export type authSocket = Socket & { user: AuthUser };

import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user';

export class UpdateUserDto extends OmitType(CreateUserDto, ['password', 'role'] as const) {}

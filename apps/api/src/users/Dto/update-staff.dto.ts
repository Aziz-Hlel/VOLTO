import { IsOptional, IsString } from 'class-validator';
import { PartialType , OmitType } from '@nestjs/mapped-types';

import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends OmitType(CreateStaffDto, ['password'] as const) {}

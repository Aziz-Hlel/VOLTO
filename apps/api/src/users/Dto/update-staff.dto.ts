import { IsOptional, IsString } from "class-validator";
import { CreateStaffDto } from "./create-staff.dto";
import { PartialType } from "@nestjs/mapped-types";


import { OmitType } from '@nestjs/mapped-types';

export class UpdateStaffDto extends OmitType(CreateStaffDto, ['password','confirmPassowrd'] as const) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateLadiesNightStatDto } from './create-ladies-night-stat.dto';

export class UpdateLadiesNightStatDto extends PartialType(CreateLadiesNightStatDto) {}

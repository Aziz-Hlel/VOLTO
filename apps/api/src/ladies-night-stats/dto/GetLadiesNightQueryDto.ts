import { Type } from 'class-transformer';
import { IsOptional, IsDateString, IsNumberString, IsPositive, IsNumber } from 'class-validator';

export class GetLadiesNightDataQueryDto {
  @IsOptional()
  @Type(() => Date)
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDateString()
  endDate?: Date;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  page: number;

  @IsOptional()
  sort?: 'startDate:asc' | 'startDate:desc';
}

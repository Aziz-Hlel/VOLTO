import { Type } from 'class-transformer';
import { IsOptional, IsDateString, IsNumberString, IsPositive, IsNumber } from 'class-validator';

export class GetLadiesNightDataQueryDto {
  @Type(() => Date)
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @Type(() => Date)
  @IsOptional()
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

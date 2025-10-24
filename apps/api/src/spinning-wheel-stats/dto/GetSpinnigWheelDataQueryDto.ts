import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class GetSpinnigWheelDataQueryDto {
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
}

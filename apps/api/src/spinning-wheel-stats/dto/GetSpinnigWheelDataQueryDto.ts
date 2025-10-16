import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class GetSpinnigWheelDataQueryDto {
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
}

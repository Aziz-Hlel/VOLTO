import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, IsUUID, Min } from 'class-validator';

export class ListMyStaffTransactionHistoryCursorParam {
  @IsOptional()
  @IsString()
  @IsUUID()
  transactionId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsPositive()
  limit: number = 5;
}

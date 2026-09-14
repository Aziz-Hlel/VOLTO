import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { IsCuid } from 'src/validators/is-cuid';

export class GetTransactionsQueryDto {
  @IsOptional()
  @IsString()
  @IsCuid()
  transactionId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsPositive()
  limit: number = 5;
}

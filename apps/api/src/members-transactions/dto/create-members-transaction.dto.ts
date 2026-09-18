import { TransactionType } from '@prisma/client';
import { IsDefined, IsEnum, IsNumber, IsOptional, Max, MaxLength, Min } from 'class-validator';

export class CreateMembersTransactionDto {
  @IsDefined()
  @IsEnum([TransactionType.REDEEM])
  type: TransactionType;

  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 3 }, { message: 'amount can have at most 3 decimal places' })
  @Min(0.001, { message: 'amount must be greater than or equal to 0.001' })
  @Max(2000, { message: 'amount must be less than or equal to 2000' })
  amount: number;

  @IsOptional()
  @MaxLength(255, { message: 'note too long' })
  note?: string;
}

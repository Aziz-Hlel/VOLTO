import { IsEnum, IsNotEmpty } from 'class-validator';

export class GetSpinnigWheelDataByPeriodDto {
  @IsNotEmpty()
  @IsEnum(['90d', '180d', '365d'])
  period: '90d' | '180d' | '365d';
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateAppSettingDto } from './create-app-setting.dto';
import { IsNumber, IsPositive, Min } from 'class-validator';

export class UpdateDrinkQuotaDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  quota: number;
}

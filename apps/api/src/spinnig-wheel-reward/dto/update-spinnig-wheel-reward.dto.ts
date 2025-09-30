import { PartialType } from '@nestjs/mapped-types';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSpinnigWheelRewardDto } from './create-spinnig-wheel-reward.dto';

export class UpdateSignleSpinnigWheelRewardDto extends CreateSpinnigWheelRewardDto {
  @IsString()
  id: string;
}

export class UpdateSpinnigWheelRewardDto {
  @IsArray()
  @ArrayMinSize(5)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => UpdateSignleSpinnigWheelRewardDto)
  rewards: UpdateSignleSpinnigWheelRewardDto[];
}

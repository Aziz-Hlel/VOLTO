import { IsIn, IsNotEmpty } from 'class-validator';

export class CheckAppVersionDto {
  @IsNotEmpty({ message: 'Platform is required' })
  @IsIn(['ios', 'android'], { message: 'Platform must be either ios or android' })
  platform: 'ios' | 'android';
}

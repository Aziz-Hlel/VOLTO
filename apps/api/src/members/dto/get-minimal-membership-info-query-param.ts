import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class GetMinimalMembershipInfoQueryParam {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  membershipUid: number;
}

import { MembershipApplication } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export type SortMember = Pick<
  MembershipApplication,
  | 'membershipType'
  | 'fullName'
  | 'email'
  | 'cprId'
  | 'nationality'
  | 'seen'
  | 'status'
  | 'createdAt'
>;

export class GetMembersQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsPositive()
  limit: number = 5;

  @IsOptional()
  @Type(() => String)
  sort?: SortMember;

  @IsOptional()
  @Type(() => String)
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  search?: string;
}

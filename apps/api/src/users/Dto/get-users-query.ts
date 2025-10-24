import { Role, User } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export type Sort = Pick<User, 'createdAt' | 'updatedAt' | 'email' | 'firstName' | 'lastName'>;

export class GetUsersQuery {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(2)
  @IsPositive()
  limit: number = 2;

  @IsOptional()
  @Type(() => String)
  sort?: Sort;

  @IsOptional()
  @Type(() => String)
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  search?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

import { GalleryTags } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class GetGalleryDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  page = 1;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  limit = 10;

  @IsOptional()
  @IsEnum(GalleryTags)
  tag: GalleryTags;
}

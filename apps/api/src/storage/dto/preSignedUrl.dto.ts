import { IsEnum, IsOptional, IsPositive, IsString, Max, MinLength } from 'class-validator';
import { EntityType, MediaPurpose } from '@prisma/client';
import { FileType } from '../types/fileType';

export class PreSignedUrlRequest {
  static oneMb = 1024 * 1024;

  @IsString()
  @MinLength(2)
  mimeType: string;

  @IsPositive()
  @Max(10 * PreSignedUrlRequest.oneMb) // 10 MB
  fileSize: number;

  @IsEnum(FileType, {
    message: 'fileType must be one of webp jpg, jpeg, png, mp4, mov, avi, gif',
  })
  fileType: FileType;

  @IsString()
  @MinLength(1)
  originalName: string;

  @IsEnum(EntityType, {
    message: `entityType must be one of ${Object.values(EntityType).join(', ')}`,
  })
  entityType: EntityType;

  @IsString()
  @MinLength(2)
  mediaPurpose: MediaPurpose;
}

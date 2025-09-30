import { Controller, Get, Post, Body, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { PreSignedUrlRequest } from 'src/storage/dto/preSignedUrl.dto';
import { PreSignedUrlResponse } from 'src/storage/dto/PreSignedUrlResponse';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post('presigned-url')
  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  async getPresignedUrl(
    @Body() preSignedUrlDto: PreSignedUrlRequest,
  ): Promise<PreSignedUrlResponse> {
    const response = await this.mediaService.getPresignedUrl(preSignedUrlDto);

    return response;
  }
}

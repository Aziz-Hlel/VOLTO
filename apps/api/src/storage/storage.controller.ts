import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateS3Dto } from './dto/create-s3.dto';
import { UpdateS3Dto } from './dto/update-s3.dto';
import { PreSignedUrlRequest } from './dto/preSignedUrl.dto';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  // ! you work with media/presigned-url not this one
  @Post('presigned-url')
  @HttpCode(200)
  @UseGuards(JwtAccessGuard)
  async getPresignedUrl(@Body() preSignedUrlDto: PreSignedUrlRequest) {
    const response = await this.storageService.getPresignedUrl(preSignedUrlDto);

    return response;
  }

  @Post()
  async create(@Body() createS3Dto: CreateS3Dto) {
    const response = await this.storageService.create(createS3Dto);
    return response;
  }

  @Get()
  async findAll() {
    const response = await this.storageService.findAll();
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.storageService.findOne(+id);
    return response;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateS3Dto: UpdateS3Dto) {
    const response = await this.storageService.update(+id, updateS3Dto);
    return response;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.storageService.remove(+id);
    return response;
  }
}

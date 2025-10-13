import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { UpdateDrinkQuotaDto } from './dto/update-drink-quota.dto';

@Controller('app-settings')
export class AppSettingsController {
  constructor(private readonly appSettingsService: AppSettingsService) {}

  @HttpCode(200)
  @Patch('/ladies-night/drink-quota')
  async update( @Body() updateDrinkQuotaDto: UpdateDrinkQuotaDto) {
   const res =  await this.appSettingsService.updateLadiesNightDrinkQuota(updateDrinkQuotaDto.quota);
 
    return res;
  }

}

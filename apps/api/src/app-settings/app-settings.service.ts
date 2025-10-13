import { Injectable } from '@nestjs/common';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AppSettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppSettingDto: CreateAppSettingDto) {
    await this.prisma.appSettings.create({
      data: {
        field: createAppSettingDto.key,
        value: createAppSettingDto.value,
      },
    });
  }

  async findAll() {
    const appSettings = await this.prisma.appSettings.findMany();
    return appSettings;
  }

  findOne(id: number) {
    return `This action returns a #${id} appSetting`;
  }

  update(id: number, updateAppSettingDto: UpdateAppSettingDto) {
    return `This action updates a #${id} appSetting`;
  }

  remove(id: number) {
    return `This action removes a #${id} appSetting`;
  }

  updateLadiesNightDrinkQuota(drinkQuota: number) {
    return this.prisma.appSettings.update({
      where: {
        field: 'LADIES_NIGHT_DRINK_QUOTA',
      },
      data: {
        value: drinkQuota.toString(),
      },
    });
  }
}

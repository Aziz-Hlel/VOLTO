import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import Redis from 'ioredis';
import { REDIS_HASHES } from 'src/redis/hashes';

@Injectable()
export class AppSettingsService {
  constructor(private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis
  
  ) {}

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

  async updateLadiesNightDrinkQuota(drinkQuota: number) {
    try{

      const res = await this.prisma.appSettings.update({
        where: {
          field: 'LADIES_NIGHT_DRINK_QUOTA',
        },
        data: {
          value: drinkQuota.toString(),
        },
      });
      
      await this.redis.hset(
        REDIS_HASHES.APP_SETTINGS.HASH(),
        REDIS_HASHES.APP_SETTINGS.LADIES_NIGHT_DRINK_QUOTA(),
        drinkQuota,
      );
      
      return res;
    }catch(error){
      throw new InternalServerErrorException(error)
    }
  }
}

import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAppSettingDto } from './dto/create-app-setting.dto';
import { UpdateAppSettingDto } from './dto/update-app-setting.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import Redis from 'ioredis';
import { REDIS_HASHES } from 'src/redis/hashes';
import { LadiesNightService } from 'src/ladies-night/ladies-night.service';
import { IAppSettings } from './types/AppSettings';
import { CheckAppVersionDto } from './dto/check-app-version-dto';
import ENV from 'src/config/env';
import { CheckAppVersionResponseDto } from './dto/check-app-version-response-dto';

@Injectable()
export class AppSettingsService {
  constructor(
    private prisma: PrismaService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
    private readonly ladiesNightService: LadiesNightService,
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
    if (await this.ladiesNightService.isLadiesNightActive())
      throw new BadRequestException('Cannot change quota while Ladies Night is active');

    const drinkQuotaKeyName: IAppSettings = 'LADIES_NIGHT_DRINK_QUOTA';

    try {
      const res = await this.prisma.appSettings.update({
        where: {
          field: drinkQuotaKeyName,
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  getAppVersion(checkAppVersionDto: CheckAppVersionDto): CheckAppVersionResponseDto {
    const userPlatformMinVersion =
      checkAppVersionDto.platform === 'ios'
        ? ENV.IOS_MIN_SUPPORTED_VER
        : ENV.ANDROID_MIN_SUPPORTED_VER;

    return {
      minSupportedVersion: userPlatformMinVersion,
    };
  }
}

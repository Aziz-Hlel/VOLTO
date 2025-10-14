import { Inject, Logger, OnApplicationBootstrap } from '@nestjs/common';
import Redis from 'ioredis';
import { AppSettingsService } from 'src/app-settings/app-settings.service';
import {
  appSettingsDefaults,
  appSettingsKeys,
  IAppSettings,
} from 'src/app-settings/types/AppSettings';
import { REDIS_HASHES } from 'src/redis/hashes';

export class AppSettingsServiceStartup implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppSettingsServiceStartup.name);

  constructor(
    private readonly appSettingsService: AppSettingsService,
    @Inject('REDIS_CLIENT') private readonly redis: Redis,
  ) {}

  async onApplicationBootstrap() {
    const appSettingsRaw = await this.appSettingsService.findAll();

    const appSettings = appSettingsRaw.reduce(
      (acc, appSetting) => {
        acc[appSetting.field] = appSetting.value;
        return acc;
      },
      {} as Record<IAppSettings, string>,
    );

    const tasks = Object.keys(appSettingsKeys).map(async (key) => {
      if (!appSettings[key]) {
        await this.appSettingsService.create({
          key: appSettingsKeys[key],
          value: appSettingsDefaults[key],
        });
        appSettings[key] = appSettingsDefaults[key];
      }
    });

    await Promise.all(tasks);

    await this.redis.hset(REDIS_HASHES.APP_SETTINGS.HASH(), appSettings);

    await this.redis.hgetall(REDIS_HASHES.APP_SETTINGS.HASH());

    this.logger.log('✅ App Settings Singleton instance is Set-up');
  }
}

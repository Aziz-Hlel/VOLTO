import { Module } from '@nestjs/common';
import { SpinnigWheelModule } from 'src/spinnig-wheel/spinnig-wheel.module';
import { SpinnigWheelRewardModule } from 'src/spinnig-wheel-reward/spinnig-wheel-reward.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SpinningWheelInitService } from './spinnig-wheel-starup.service';
import { StartupModuleService } from './startup-module.service';
import { AppSettingsServiceStartup } from './app-settings-startup.service';
import { AppSettingsModule } from 'src/app-settings/app-settings.module';

@Module({
  imports: [PrismaModule, SpinnigWheelModule, SpinnigWheelRewardModule, AppSettingsModule],
  providers: [StartupModuleService, SpinningWheelInitService, AppSettingsServiceStartup],
})
export class StartupModuleModule {}

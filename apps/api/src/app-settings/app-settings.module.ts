import { Module } from '@nestjs/common';
import { AppSettingsService } from './app-settings.service';
import { AppSettingsController } from './app-settings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LadiesNightModule } from 'src/ladies-night/ladies-night.module';

@Module({
  imports: [PrismaModule,LadiesNightModule],
  controllers: [AppSettingsController],
  providers: [AppSettingsService],
  exports: [AppSettingsService],
})
export class AppSettingsModule {}

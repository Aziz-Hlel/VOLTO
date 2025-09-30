// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import in every module
      envFilePath: '.env',
    }),
  ],
})
export class AppConfigModule {}

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { BullmqModule } from 'src/bullmq/bullmq.module';
import { AppConfigModule } from 'src/config/config.module';
import { EmailModule } from 'src/email/email.module';
import { EventsModule } from 'src/events/events.module';
import { GalleryModule } from 'src/gallery/gallery.module';
import { LadiesNightStatsModule } from 'src/ladies-night-stats/ladies-night-stats.module';
import { LadiesNightModule } from 'src/ladies-night/ladies-night.module';
import { MediaModule } from 'src/media/media.module';
import { MembersModule } from 'src/members/members.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
import { SpinnigWheelRewardModule } from 'src/spinnig-wheel-reward/spinnig-wheel-reward.module';
import { SpinnigWheelModule } from 'src/spinnig-wheel/spinnig-wheel.module';
import { SpinningWheelStatsModule } from 'src/spinning-wheel-stats/spinning-wheel-stats.module';
import { StartupModuleModule } from 'src/startup-module/startup-module.module';
import { StorageModule } from 'src/storage/storage.module';
import { UsersModule } from 'src/users/users.module';
import { WorkersModule } from 'src/workers/workers.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AppConfigModule,

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'), // path to your public folder
      useGlobalPrefix: true,
      serveRoot: '/public', // optional, the URL prefix
    }),

    PrismaModule,
    RedisModule,
    UsersModule,
    AuthModule,
    WorkersModule,
    StorageModule,
    MediaModule,
    EventsModule,
    LadiesNightModule,
    LadiesNightStatsModule,
    BullmqModule,
    StartupModuleModule,
    SpinnigWheelRewardModule,
    SpinnigWheelModule,
    SpinningWheelStatsModule,
    GalleryModule,
    EmailModule,
    MembersModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

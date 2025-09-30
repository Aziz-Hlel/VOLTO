import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LadiesNightGateway } from './ladies-night.gateway';
import { LadiesNightService } from './ladies-night.service';
import { LadiesNightController } from './ladies-night.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [LadiesNightController],
  providers: [LadiesNightGateway, LadiesNightService],
  exports: [LadiesNightService],
})
export class LadiesNightModule {}

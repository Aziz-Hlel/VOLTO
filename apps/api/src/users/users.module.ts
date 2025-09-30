import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { StaffController } from './staff.controller';

@Module({
  imports: [PrismaModule, MediaModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController, StaffController],
})
export class UsersModule {}

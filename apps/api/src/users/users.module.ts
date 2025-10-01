import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MediaModule } from 'src/media/media.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { StaffController } from './staff.controller';
import { EmailModule } from 'src/email/email.module';
import { PasswordResetController } from './passwordReset.controller';

@Module({
  imports: [PrismaModule, MediaModule,EmailModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController, StaffController,PasswordResetController],
})
export class UsersModule {}

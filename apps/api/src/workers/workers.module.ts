import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';

@Module({
  imports: [PrismaModule],
  providers: [WorkersService],
  controllers: [WorkersController],
})
export class WorkersModule {}

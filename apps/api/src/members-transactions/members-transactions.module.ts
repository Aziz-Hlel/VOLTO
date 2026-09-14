import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MembersTransactionsController } from './members-transactions.controller';
import { MembersTransactionsService } from './members-transactions.service';

@Module({
  imports: [PrismaModule],
  controllers: [MembersTransactionsController],
  providers: [MembersTransactionsService],
})
export class MembersTransactionsModule {}

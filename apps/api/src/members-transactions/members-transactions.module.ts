import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MembersTransactionsController } from './members-transactions.controller';
import { MembersTransactionsService } from './members-transactions.service';
import { MembersTransactionsController2 } from './members-transactions2.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MembersTransactionsController, MembersTransactionsController2],
  providers: [MembersTransactionsService],
})
export class MembersTransactionsModule {}
  
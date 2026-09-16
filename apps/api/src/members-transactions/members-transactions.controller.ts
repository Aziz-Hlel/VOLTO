import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { CreateMembersTransactionDto } from './dto/create-members-transaction.dto';
import { GetTransactionsQueryDto } from './dto/find-all-transactions-cursor-dto';
import { MembersTransactionsService } from './members-transactions.service';

@Controller('members/:membershipId/transactions')
export class MembersTransactionsController {
  constructor(private readonly membersTransactionsService: MembersTransactionsService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CASHIER, Role.WAITER)
  @Post()
  create(
    @Param('membershipId') membershipId: string,
    @Body() createMembersTransactionDto: CreateMembersTransactionDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.membersTransactionsService.create(membershipId, createMembersTransactionDto, user);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CASHIER, Role.WAITER)
  @Get()
  findAllByMembershipId(
    @Param('membershipId', new ParseUUIDPipe()) membershipId: string,
    @Query() query: GetTransactionsQueryDto,
  ) {
    return this.membersTransactionsService.findAllByMembershipId(membershipId, query);
  }
}

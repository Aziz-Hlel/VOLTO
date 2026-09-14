import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
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
import z from 'zod';
import { CreateMembersTransactionDto } from './dto/create-members-transaction.dto';
import { GetTransactionsQueryDto } from './dto/get-transactions-cursor-dto';
import { MembersTransactionsService } from './members-transactions.service';

@Controller('members-transactions')
export class MembersTransactionsController {
  constructor(private readonly membersTransactionsService: MembersTransactionsService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CASHIER, Role.WAITER)
  @Post()
  create(
    @Body() createMembersTransactionDto: CreateMembersTransactionDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.membersTransactionsService.create(createMembersTransactionDto, user);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CASHIER, Role.WAITER)
  @Get(':membershipId')
  findAllByMembershipId(
    @Param('membershipId') membershipId: string,
    @Query() query: GetTransactionsQueryDto,
  ) {
    const validatedMembershipId = z.cuid().safeParse(membershipId);
    if (!validatedMembershipId.success) throw new BadRequestException('Invalid membership ID');

    return this.membersTransactionsService.findAllByMembershipId(validatedMembershipId.data, query);
  }
}

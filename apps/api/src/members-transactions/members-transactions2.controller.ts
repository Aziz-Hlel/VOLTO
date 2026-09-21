import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetMinimalMembershipInfoQueryParam } from 'src/members/dto/get-minimal-membership-info-query-param';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { CreateMembersTransactionDto } from './dto/create-members-transaction.dto';
import { MembersTransactionsService } from './members-transactions.service';

@Controller('members/by-uid//:membershipUid/transactions')
export class MembersTransactionsController2 {
  constructor(private readonly membersTransactionsService: MembersTransactionsService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.WAITER)
  @Post()
  createByMembershipUid(
    @Param() params: GetMinimalMembershipInfoQueryParam,
    @Body() createMembersTransactionDto: CreateMembersTransactionDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.membersTransactionsService.createByMembershipUid(
      params.membershipUid,
      createMembersTransactionDto,
      user,
    );
  }
}

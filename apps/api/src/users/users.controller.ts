import { Controller, Get, HttpCode, Query, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { GetUsersQuery } from './Dto/get-users-query';
import { ListTransactionHistoryCursorParam } from './Dto/list-transaction-history-param.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CASHIER)
  @HttpCode(200)
  @Get()
  async getUsers(@Query() query: GetUsersQuery) {
    const response = await this.usersService.getUsers(query);
    return response;
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(200)
  @Get('/transactions')
  async getUserTransactions(@Query() query: ListTransactionHistoryCursorParam) {
    const response = await this.usersService.ListAllTransactionHistory(query);
    return response;
  }
}

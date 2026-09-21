import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthUser } from './Dto/AuthUser';
import { CreateStaffDto } from './Dto/create-staff.dto';
import { ListTransactionHistoryCursorParam } from './Dto/list-transaction-history-param.dto';
import { UpdateStaffDto } from './Dto/update-staff.dto';
import { UsersService } from './users.service';

@Controller('staff')
export class StaffController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(201)
  @Post(['', '/'])
  async createStaff(@Body() createStaffDto: CreateStaffDto) {
    const response = await this.usersService.createStaff(createStaffDto);

    return response;
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Get(['', '/'])
  async getStaff() {
    const response = await this.usersService.getAllStaff();
    return response;
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Get('/:id')
  async getStaffById(@Param('id', ParseUUIDPipe) id: string) {
    const response = await this.usersService.getStaffById(id);

    return response;
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Put('/:staffId')
  async updateStaff(
    @Param('staffId', ParseUUIDPipe) staffId: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    const response = await this.usersService.updateStaff(staffId, updateStaffDto);
    return response;
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Delete('/:staffId')
  async deleteStaff(
    @Param('staffId', ParseUUIDPipe) staffId: string,
    @CurrentUser() user: AuthUser,
  ) {
    const response = await this.usersService.deleteStaff(staffId, user.role);
    return response;
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.WAITER)
  @HttpCode(200)
  @Get('/transactions/me')
  async getStaffTransactionHistory(
    @CurrentUser() user: AuthUser,
    @Query() cursorParam: ListTransactionHistoryCursorParam,
  ) {
    const response = await this.usersService.ListMyStaffTransactionHistory(user, cursorParam);
    return response;
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CASHIER)
  @HttpCode(200)
  @Get('/transactions')
  async getAllTransactionHistory(
    @Query() cursorParam: ListTransactionHistoryCursorParam,
  ) {
    const response = await this.usersService.ListAllTransactionHistory(cursorParam);
    return response;
  }
}

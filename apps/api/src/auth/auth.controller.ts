// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  HttpCode,
  Delete,
  Put,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { Role } from '@prisma/client';
import { CreateCustomerDto } from 'src/users/Dto/create-customer';
import { AuthService } from './auth.service';
import { JwtAccessGuard } from './guards/jwt.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { LoginRequestDto } from './dto/loginRequestDto';
import { UpdateUserDto } from 'src/users/Dto/update-user';
import { ChangePasswordRequestDto } from 'src/users/Dto/change-password-request.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  async registerCustomer(@Body() dto: CreateCustomerDto) {
    const payload = await this.authService.registerCustomer(dto);

    return payload;
  }

  // ? i think you re not using this api alone
  // @UseGuards(JwtAccessGuard, RolesGuard)
  // @HttpCode(201)
  // @Post('register-admin')
  // async adminRegister(@Body() dto: CreateUserDto) {
  //   const payload = await this.authService.registerCustomer(dto);

  //   return payload;
  // }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginRequestDto) {
    const payload = await this.authService.login(dto.email, dto.password);

    return payload;
  }

  @HttpCode(200)
  @Post('login/admin')
  async loginAdmin(@Body() dto: LoginRequestDto) {
    const payload = await this.authService.loginAdmin(dto.email, dto.password);

    return payload;
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() payload: { refreshToken: string }) {
    if (!payload.refreshToken && typeof payload.refreshToken !== 'string')
      throw new BadRequestException('No refresh token provided');
    const response = await this.authService.refresh(payload.refreshToken);

    return response;
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(200)
  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: AuthUser) {
    const userId = user.id;
    const response = await this.authService.updateUser(userId, updateUserDto);
    return response;
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(200)
  @Get('me')
  async me(@CurrentUser() user: AuthUser) {
    const userDto = this.authService.me(user);

    return userDto;
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(200)
  @Put('me')
  async updateMe(@CurrentUser() user: AuthUser, @Body() updateUserDto: UpdateUserDto) {
    const userId = user.id;
    const userDto = await this.authService.updateMe(userId, updateUserDto);

    return userDto;
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Get('test')
  test(@CurrentUser() user: AuthUser) {
    return {
      message: 'You are authenticated and authorized!',
      user,
    };
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Patch('change-password')
  async changePassword(@CurrentUser() user: AuthUser, @Body() dto: ChangePasswordRequestDto) {
    const userId = user.id;
    const response = await this.authService.changePassword(userId, dto);
    return response;
  }

  @UseGuards(JwtAccessGuard)
  @HttpCode(200)
  @Delete()
  async deleteUser(@CurrentUser() user: AuthUser) {
    const userId = user.id;
    await this.authService.deleteAccount(userId);
    return {
      success: true,
      message: 'Account deleted successfully',
    };
  }
}

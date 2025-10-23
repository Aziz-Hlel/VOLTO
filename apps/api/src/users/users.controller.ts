import { UsersService } from './users.service';
import { Role } from '@prisma/client';
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
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { AuthUser } from './Dto/AuthUser';

@Controller('users')
export class UsersController {
  
  constructor(private usersService: UsersService) {}
    

    
  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Get('/:staffId')
  async getUsers() {
    const response = await this.usersService.getUsers();
    return response;
  }

  
}

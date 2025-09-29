import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersService } from './users.service';

@Controller('staff')
export class StaffController {

    constructor(private usersService: UsersService) {}


    @UseGuards(JwtAccessGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @HttpCode(200)
    @Get()
    async createStaff() {
      
        const response = await this.usersService.getStaff();
        return response;
        
    };


    @UseGuards(JwtAccessGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @HttpCode(200)
    @Get()
    async getStaff() {
      
        const response = await this.usersService.getStaff();
        return response;
        
    }; 



    @UseGuards(JwtAccessGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @HttpCode(200)
    @Get('/:id')
    async getStaffById() {
      
        const response = await this.usersService.getStaff();
        return response;
        
    };









}

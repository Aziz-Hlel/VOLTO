import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UsersService } from './users.service';
import { CreateStaffDto } from './Dto/create-staff.dto';
import { UpdateStaffDto } from './Dto/update-staff.dto';

@Controller('staff')
export class StaffController {

    constructor(private usersService: UsersService) {}


    @UseGuards(JwtAccessGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @HttpCode(200)
    @Post(['','/'])
    async createStaff(@Body() createStaffDto: CreateStaffDto) {
      
        const response = await this.usersService.createStaff(createStaffDto);
        return response;
        
    };


    @UseGuards(JwtAccessGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @HttpCode(200)
    @Get(['','/'])
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




    @UseGuards(JwtAccessGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @HttpCode(200)
    @Put('/:staffId')
    async updateStaff(@Param('staffId',ParseUUIDPipe) staffId: string ,@Body() updateStaffDto: UpdateStaffDto) {
      
        const response = await this.usersService.updateStaff( staffId,updateStaffDto);
        return response;
        
    };





}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
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
import { AuthUser } from 'src/users/Dto/AuthUser';
import { GetMembersQuery } from './dto/get-members-query.dto';
import { SubmitMemberApplicationDto } from './dto/submit-member-application.dto';
import { UpdateMemberStatusDto } from './dto/update-member-status.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Post()
  async create(@Body() createMemberDto: SubmitMemberApplicationDto) {
    return await this.membersService.create(createMemberDto);
  }

  @Get()
  async findAll(@Query() query: GetMembersQuery) {
    return await this.membersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.membersService.findOne(id);
  }

  @UseGuards(JwtAccessGuard)
  @Get('/email')
  async findOneByEmail(@CurrentUser() user: AuthUser) {
    return await this.membersService.findOneByEmail(user.email);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return await this.membersService.update(id, updateMemberDto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateStatusDto: UpdateMemberStatusDto) {
    return await this.membersService.updateStatus(id, updateStatusDto.status);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.membersService.remove(id);
  }
}

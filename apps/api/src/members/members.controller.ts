import { Body, Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthUser } from 'src/users/Dto/AuthUser';
import { ApproveMembershipDto } from './dto/approve-membership.dto';
import { GetMinimalMembershipInfoQueryParam } from './dto/get-minimal-membership-info-query-param';
import { UpdateMemberStatusDto } from './dto/update-member-status.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MembersService } from './members.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Post(':id/approve')
  approveApplication(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() createMemberDto: ApproveMembershipDto,
  ) {
    return this.membersService.approveApplication(id, user, createMemberDto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Post(':id/renew')
  renewApplication(
    @Param('id') id: string,
    @CurrentUser() user: AuthUser,
    @Body() createMemberDto: ApproveMembershipDto,
  ) {
    return this.membersService.renewApplication(id, user, createMemberDto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @Patch(':id/details')
  updateDetails(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.membersService.updateDetails(id, updateMemberDto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(200)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() updateMemberStatusDto: UpdateMemberStatusDto) {
    return this.membersService.updateStatus(id, updateMemberStatusDto);
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.WAITER, Role.SECURITY)
  @HttpCode(200)
  @Get(':membershipUid')
  getMinimalMembershipInfo(@Param() params: GetMinimalMembershipInfoQueryParam) {
    return this.membersService.findByMembershipUid(params.membershipUid);
  }
}

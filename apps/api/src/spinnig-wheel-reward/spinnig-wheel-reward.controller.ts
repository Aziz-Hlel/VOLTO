import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { JwtAccessGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateSpinnigWheelRewardDto } from './dto/update-spinnig-wheel-reward.dto';
import { CreateSpinnigWheelRewardDto } from './dto/create-spinnig-wheel-reward.dto';
import { SpinnigWheelRewardService } from './spinnig-wheel-reward.service';

@Controller('spinnig-wheel-reward')
export class SpinnigWheelRewardController {
  constructor(private readonly spinnigWheelRewardService: SpinnigWheelRewardService) {}

  @Get()
  findAll() {
    return this.spinnigWheelRewardService.findAll();
  }

  @UseGuards(JwtAccessGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @Put()
  async update(@Body() updateSpinnigWheelRewardDto: UpdateSpinnigWheelRewardDto) {
    console.log('updateSpinnigWheelRewardDto', updateSpinnigWheelRewardDto);
    const updatedReward = await this.spinnigWheelRewardService.update(updateSpinnigWheelRewardDto);

    return updatedReward;
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { LadiesNightStatsService } from './ladies-night-stats.service';
import { GetLadiesNightDataQueryDto } from './dto/GetLadiesNightQueryDto';
import { GetLadiesNightByPeriodDto } from './dto/GetLadiesNightByPeriod.dto';

@Controller('ladies-night-stats')
export class LadiesNightStatsController {
  constructor(private readonly ladiesNightStatsService: LadiesNightStatsService) {}

  @Get('list')
  async findMany(@Query() query: GetLadiesNightDataQueryDto) {
    const data = await this.ladiesNightStatsService.findMany(query);

    return data;
  }

  @Get('periodic')
  async getByPeriod(@Query() query: GetLadiesNightByPeriodDto) {
    const data = await this.ladiesNightStatsService.getByPeriod(query);

    return data;
  }
}

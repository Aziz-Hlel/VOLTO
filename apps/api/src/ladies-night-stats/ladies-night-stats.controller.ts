import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { LadiesNightStatsService } from './ladies-night-stats.service';
import { GetLadiesNightDataQueryDto } from './dto/GetLadiesNightQueryDto';


@Controller('ladies-night-stats')
export class LadiesNightStatsController {
  constructor(private readonly ladiesNightStatsService: LadiesNightStatsService) {}


  @Get()
  async findMany(@Query() query: GetLadiesNightDataQueryDto) {
    const data = await this.ladiesNightStatsService.findMany(query);

    return data
  }


}

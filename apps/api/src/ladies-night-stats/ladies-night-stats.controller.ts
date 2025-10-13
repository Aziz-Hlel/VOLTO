import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Res } from '@nestjs/common';
import { LadiesNightStatsService } from './ladies-night-stats.service';
import { CreateLadiesNightStatDto } from './dto/create-ladies-night-stat.dto';
import { UpdateLadiesNightStatDto } from './dto/update-ladies-night-stat.dto';
import { GetLadiesNightDataQueryDto } from './dto/GetLadiesNightQueryDto';
import type { Response } from 'express';


@Controller('ladies-night-stats')
export class LadiesNightStatsController {
  constructor(private readonly ladiesNightStatsService: LadiesNightStatsService) {}


  @Get()
  async findMany(@Query() query: GetLadiesNightDataQueryDto, @Res({ passthrough: true }) response: Response) {
    const data = await this.ladiesNightStatsService.findMany(query);

        response.setHeader('X-Total-Count', data.count.toString());


    return data.ladiesNightStats
  }


}

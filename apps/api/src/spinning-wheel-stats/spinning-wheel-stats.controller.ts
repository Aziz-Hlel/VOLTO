import { Controller, Get, Query } from '@nestjs/common';
import { SpinningWheelStatsService } from './spinning-wheel-stats.service';
import { GetSpinnigWheelDataQueryDto } from './dto/GetSpinnigWheelDataQueryDto';
import { GetSpinnigWheelDataByPeriodDto } from './dto/GetSpinningWheelByPeriod.dto';

@Controller('spinning-wheel-stats')
export class SpinningWheelStatsController {
  constructor(private readonly spinningWheelStatsService: SpinningWheelStatsService) {}

  @Get('list')
  async findMany(@Query() query: GetSpinnigWheelDataQueryDto) {
    const data = await this.spinningWheelStatsService.findMany(query);

    return data;
  }

  @Get('periodic')
  async getByPeriod(@Query() query: GetSpinnigWheelDataByPeriodDto) {
    const data = await this.spinningWheelStatsService.getByPeriod(query);

    return data;
  }
}

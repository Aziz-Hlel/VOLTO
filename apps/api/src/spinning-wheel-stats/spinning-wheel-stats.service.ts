import { BadRequestException, Injectable } from '@nestjs/common';
import { GetSpinnigWheelDataQueryDto } from './dto/GetSpinnigWheelDataQueryDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetSpinnigWheelDataByPeriodDto } from './dto/GetSpinningWheelByPeriod.dto';

@Injectable()
export class SpinningWheelStatsService {
  constructor(private prisma: PrismaService) {}

  async findMany(query: GetSpinnigWheelDataQueryDto) {
    const { startDate, endDate, limit, page } = query;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (startDate || endDate) {
      where.startDate = {};
      if (startDate) where.startDate.gte = startDate;
      if (endDate) where.startDate.lte = endDate;
    }

    const orderBy = { startDate: 'desc' } as const;

    const spinnigWheelStats = this.prisma.spinningWheelData.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const total = this.prisma.spinningWheelData.count({ where });
    const [response, count] = await Promise.all([spinnigWheelStats, total]);

    return {
      spinningWheelStats: response,
      count,
    };
  }

  async getByPeriod(query: GetSpinnigWheelDataByPeriodDto) {
    const period = Number(query.period.split('d')[0]);

    if (isNaN(period)) throw new BadRequestException('period must be a number');

    const orderBy = { startDate: 'asc' } as const;

    const spinningWheelStats = await this.prisma.spinningWheelData.findMany({
      where: {
        startDate: {
          gte: new Date(Date.now() - period * 24 * 60 * 60 * 1000),
        },
      },
      orderBy,
    });

    return spinningWheelStats;
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateLadiesNightStatDto } from './dto/create-ladies-night-stat.dto';
import { UpdateLadiesNightStatDto } from './dto/update-ladies-night-stat.dto';
import { GetLadiesNightDataQueryDto } from './dto/GetLadiesNightQueryDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetLadiesNightByPeriodDto } from './dto/GetLadiesNightByPeriod.dto';

@Injectable()
export class LadiesNightStatsService {
  constructor(private prisma: PrismaService) {}

  async findMany(query: GetLadiesNightDataQueryDto) {
    const { startDate, endDate, limit, page, sort = 'startDate:asc' } = query;
    const skip = (page - 1) * limit;
    const where: any = {};
    if (startDate || endDate) {
      where.startDate = {};
      if (startDate) where.startDate.gte = startDate;
      if (endDate) where.startDate.lte = endDate;
    }

    const orderBy = { startDate: 'desc' } as const;

    const ladiesNightStats = this.prisma.ladiesNightData.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const total = this.prisma.ladiesNightData.count({ where });
    const [response, count] = await Promise.all([ladiesNightStats, total]);

    return {
      ladiesNightStats: response,
      count,
    };
  }

  async getByPeriod(query: GetLadiesNightByPeriodDto) {
    const period = Number(query.period.split('d')[0]);

    if (isNaN(period)) throw new BadRequestException('period must be a number');

    const orderBy = { startDate: 'asc' } as const;

    const ladiesNightStats = await this.prisma.ladiesNightData.findMany({
      where: {
        startDate: {
          gte: new Date(Date.now() - period * 24 * 60 * 60 * 1000),
        },
      },
      orderBy,
    });

    return ladiesNightStats;
  }
}

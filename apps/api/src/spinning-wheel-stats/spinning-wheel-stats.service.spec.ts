import { Test, TestingModule } from '@nestjs/testing';
import { SpinningWheelStatsService } from './spinning-wheel-stats.service';

describe('SpinningWheelStatsService', () => {
  let service: SpinningWheelStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpinningWheelStatsService],
    }).compile();

    service = module.get<SpinningWheelStatsService>(SpinningWheelStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

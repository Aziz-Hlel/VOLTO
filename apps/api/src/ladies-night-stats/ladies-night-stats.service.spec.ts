import { Test, TestingModule } from '@nestjs/testing';
import { LadiesNightStatsService } from './ladies-night-stats.service';

describe('LadiesNightStatsService', () => {
  let service: LadiesNightStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LadiesNightStatsService],
    }).compile();

    service = module.get<LadiesNightStatsService>(LadiesNightStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

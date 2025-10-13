import { Test, TestingModule } from '@nestjs/testing';
import { LadiesNightStatsController } from './ladies-night-stats.controller';
import { LadiesNightStatsService } from './ladies-night-stats.service';

describe('LadiesNightStatsController', () => {
  let controller: LadiesNightStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LadiesNightStatsController],
      providers: [LadiesNightStatsService],
    }).compile();

    controller = module.get<LadiesNightStatsController>(LadiesNightStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

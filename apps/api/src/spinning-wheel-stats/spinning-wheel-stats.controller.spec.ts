import { Test, TestingModule } from '@nestjs/testing';
import { SpinningWheelStatsController } from './spinning-wheel-stats.controller';
import { SpinningWheelStatsService } from './spinning-wheel-stats.service';

describe('SpinningWheelStatsController', () => {
  let controller: SpinningWheelStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpinningWheelStatsController],
      providers: [SpinningWheelStatsService],
    }).compile();

    controller = module.get<SpinningWheelStatsController>(SpinningWheelStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

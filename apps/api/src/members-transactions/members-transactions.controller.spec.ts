import { Test, TestingModule } from '@nestjs/testing';
import { MembersTransactionsController } from './members-transactions.controller';
import { MembersTransactionsService } from './members-transactions.service';

describe('MembersTransactionsController', () => {
  let controller: MembersTransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersTransactionsController],
      providers: [MembersTransactionsService],
    }).compile();

    controller = module.get<MembersTransactionsController>(MembersTransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

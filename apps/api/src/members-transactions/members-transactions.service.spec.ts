import { Test, TestingModule } from '@nestjs/testing';
import { MembersTransactionsService } from './members-transactions.service';

describe('MembersTransactionsService', () => {
  let service: MembersTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersTransactionsService],
    }).compile();

    service = module.get<MembersTransactionsService>(MembersTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

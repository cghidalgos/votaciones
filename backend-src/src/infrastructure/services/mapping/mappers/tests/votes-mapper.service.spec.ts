import { Test, TestingModule } from '@nestjs/testing';
import { VotesMapperService } from '../votes-mapper.service';

describe('VotesMapperService', () => {
  let service: VotesMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesMapperService],
    }).compile();

    service = module.get<VotesMapperService>(VotesMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

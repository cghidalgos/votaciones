import { Test, TestingModule } from '@nestjs/testing';
import { AnswerMapperService } from '../answer-mapper.service';

describe('AnswerMapperService', () => {
  let service: AnswerMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerMapperService],
    }).compile();

    service = module.get<AnswerMapperService>(AnswerMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

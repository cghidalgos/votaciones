import { Test, TestingModule } from '@nestjs/testing';
import { SurveyMapperService } from '../survey-mapper.service';

describe('SurveyMapperService', () => {
  let service: SurveyMapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveyMapperService],
    }).compile();

    service = module.get<SurveyMapperService>(SurveyMapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

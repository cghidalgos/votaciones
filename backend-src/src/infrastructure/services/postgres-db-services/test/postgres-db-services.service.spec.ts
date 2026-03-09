import { Test, TestingModule } from '@nestjs/testing';
import { PostgresDbServicesService } from '../postgres-db-services.service';

describe('PostgresDbServicesService', () => {
  let service: PostgresDbServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresDbServicesService],
    }).compile();

    service = module.get<PostgresDbServicesService>(PostgresDbServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

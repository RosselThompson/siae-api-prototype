import { Test, TestingModule } from '@nestjs/testing';
import { RecintoService } from './recinto.service';

describe('RecintoService', () => {
  let service: RecintoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecintoService],
    }).compile();

    service = module.get<RecintoService>(RecintoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RecintoController } from './recinto.controller';
import { RecintoService } from './recinto.service';

describe('RecintoController', () => {
  let controller: RecintoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecintoController],
      providers: [RecintoService],
    }).compile();

    controller = module.get<RecintoController>(RecintoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

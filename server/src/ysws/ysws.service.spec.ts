import { Test, TestingModule } from '@nestjs/testing';
import { YswsService } from './ysws.service';

describe('YswsService', () => {
  let service: YswsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YswsService],
    }).compile();

    service = module.get<YswsService>(YswsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

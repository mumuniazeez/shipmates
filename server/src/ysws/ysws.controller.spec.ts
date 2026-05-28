import { Test, TestingModule } from '@nestjs/testing';
import { YswsController } from './ysws.controller';
import { YswsService } from './ysws.service';

describe('YswsController', () => {
  let controller: YswsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YswsController],
      providers: [YswsService],
    }).compile();

    controller = module.get<YswsController>(YswsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

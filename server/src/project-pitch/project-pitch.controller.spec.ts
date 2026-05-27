import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPitchController } from './project-pitch.controller';
import { ProjectPitchService } from './project-pitch.service';

describe('ProjectPitchController', () => {
  let controller: ProjectPitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPitchController],
      providers: [ProjectPitchService],
    }).compile();

    controller = module.get<ProjectPitchController>(ProjectPitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

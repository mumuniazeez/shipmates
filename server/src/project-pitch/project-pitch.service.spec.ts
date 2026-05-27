import { Test, TestingModule } from '@nestjs/testing';
import { ProjectPitchService } from './project-pitch.service';

describe('ProjectPitchService', () => {
  let service: ProjectPitchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectPitchService],
    }).compile();

    service = module.get<ProjectPitchService>(ProjectPitchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

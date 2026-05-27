import { Module } from '@nestjs/common';
import { ProjectPitchService } from './project-pitch.service';
import { ProjectPitchController } from './project-pitch.controller';

@Module({
  controllers: [ProjectPitchController],
  providers: [ProjectPitchService],
})
export class ProjectPitchModule {}

import { PartialType } from '@nestjs/swagger';
import { CreateProjectPitchDto } from './create-project-pitch.dto';

export class UpdateProjectPitchDto extends PartialType(CreateProjectPitchDto) {}

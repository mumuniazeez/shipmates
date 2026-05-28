import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectPitchDto, SkillDto } from './create-project-pitch.dto';

export class UpdateProjectPitchDto extends PartialType(CreateProjectPitchDto) {
  @ApiProperty({
    description:
      'List of skills needed(to be added) for the project. Skill already exist in database\n**Note: Override the skillsNeeded array if provided**',
    type: [SkillDto],
  })
  skills?: SkillDto[] | undefined;
}

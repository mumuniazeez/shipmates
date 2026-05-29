import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectPitchDto } from './create-project-pitch.dto';
import { CreateSkillDto } from 'src/skill/dto/create-skill.dto';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class UpdateProjectPitchDto extends PartialType(CreateProjectPitchDto) {
  @ApiProperty({
    description:
      'List of skills needed(to be added) for the project. Skill already exist in database\n**Note: Override the skillsNeeded array if provided**',
    type: [CreateSkillDto],
  })
  @Type(() => CreateSkillDto)
  @ValidateNested({ each: true })
  @IsArray()
  skills?: CreateSkillDto[] | undefined;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSkillDto } from 'src/skill/dto/create-skill.dto';

export class CreateProjectPitchDto {
  @ApiProperty({
    type: 'string',
    description: 'Title of the project to be pitched',
  })
  @IsString()
  @IsNotEmpty()
  projectTitle: string;

  @ApiProperty({
    type: 'string',
    description: 'The description of what needed for the project',
  })
  @IsString()
  @IsNotEmpty()
  pitchDescription: string;

  @ApiProperty({
    type: [CreateSkillDto],
    description:
      'List of skills needed(to be added) for the project. **Skill already exist in database**',
  })
  @Type(() => CreateSkillDto)
  @ValidateNested({ each: true })
  @IsArray()
  skills: CreateSkillDto[];
}

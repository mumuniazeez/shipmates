import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SkillDto {
  @IsUUID()
  @ApiProperty({
    type: 'string',
    description: 'id of the skill needed for the project',
  })
  id: string;
}

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
    type: [SkillDto],
    description:
      'List of skills needed(to be added) for the project. **Skill already exist in database**',
  })
  @Type(() => SkillDto)
  @ValidateNested({ each: true })
  @IsArray()
  skills: SkillDto[];

  @ApiProperty({
    type: [String],
    description:
      'List of skills needed for the project. **Skill do not exist in database**',
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsArray()
  newSkills: string[];
}

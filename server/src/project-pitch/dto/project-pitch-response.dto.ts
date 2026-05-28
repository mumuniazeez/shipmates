import { ApiProperty } from '@nestjs/swagger';
import { SkillResponseDto } from 'src/skill/dto/skill-response.dto';

export class ProjectPitchResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'ID of the project',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Title of the project to be pitched',
  })
  title: string;

  @ApiProperty({
    type: 'string',
    description: 'The description of what needed for the project',
  })
  description: string;

  @ApiProperty({
    type: () => [SkillResponseDto],
    description: 'The description of what needed for the project',
  })
  skills: SkillResponseDto[];

  @ApiProperty({
    type: 'string',
    description: 'The date the project pitch was created',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'The data the project pitch was last updated',
  })
  updatedAt: Date;
}

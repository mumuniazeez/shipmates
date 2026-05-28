import { ApiProperty } from '@nestjs/swagger';

export class SkillResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'ID of the skill',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    description: 'Name of the skill',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'The date the skill was created',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    description: 'The data the skill was last updated',
  })
  updatedAt: Date;
}

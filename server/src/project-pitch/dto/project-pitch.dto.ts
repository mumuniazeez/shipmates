import { ApiProperty } from '@nestjs/swagger';

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
}

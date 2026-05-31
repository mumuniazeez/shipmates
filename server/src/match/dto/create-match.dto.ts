import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateMatchDto {
  @ApiProperty({
    type: 'string',
    description: 'The id of the project to match users',
  })
  @IsUUID()
  projectId: string;
}

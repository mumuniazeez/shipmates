import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSkillDto {
  @ApiProperty({
    type: 'string',
    description: 'The name of the skill to be added',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'The first name of the user',
    nullable: true,
  })
  @IsString()
  firstName!: string;
  @ApiProperty({
    type: 'string',
    description: 'The last name of the user',
    nullable: true,
  })
  @IsString()
  lastName!: string;
}

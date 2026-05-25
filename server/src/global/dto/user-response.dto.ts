import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'The unique identifier of the user',
  })
  id!: string;
  @ApiProperty({
    type: 'string',
    description: 'The hack club unique identifier of the user',
  })
  hcId!: string;
  @ApiProperty({
    type: 'string',
    description: 'The email address of the user',
  })
  email!: string;
  @ApiProperty({
    type: 'string',
    description: 'The slack unique identifier of the user',
    nullable: true,
  })
  slackId!: string | null;
  @ApiProperty({
    type: 'string',
    description: 'The first name of the user',
    nullable: true,
  })
  firstName!: string | null;
  @ApiProperty({
    type: 'string',
    description: 'The last name of the user',
    nullable: true,
  })
  lastName!: string | null;
  @ApiProperty({
    type: 'string',
    description: 'The profile image of the user',
    nullable: true,
  })
  profileImg!: string | null;
  @ApiProperty({
    type: 'boolean',
    description: 'Whether the user is eligible for the YSWS program',
  })
  yswsEligible!: boolean;
  @ApiProperty({
    type: Date,
    description: 'When the user account was created',
  })
  createdAt!: Date;
  @ApiProperty({
    type: Date,
    description: 'When last the user account was updated',
  })
  updatedAt!: Date;
}

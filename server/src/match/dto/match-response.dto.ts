import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from 'generated/prisma';
import { ProjectPitchRelationalResponseDto } from 'src/project-pitch/dto/project-pitch-response.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';

export class MatchRelationalResponseDto {
  @ApiProperty({ type: 'string', description: 'id of the match' })
  id: string;

  @ApiProperty({ type: 'string', description: 'Project Pitch Owner user id' })
  projectOwnerId: string;

  @ApiProperty({ type: 'string', description: 'Collaborator user id' })
  collaboratingUserId: string;

  @ApiProperty({ type: 'string', description: 'Project Pitch id' })
  projectPitchId: string;

  @ApiProperty({
    enum: MatchStatus,
    description: 'Project Pitch id',
  })
  matchStatus: MatchStatus;

  @ApiProperty({
    type: 'string',
    description: 'Slack channel id',
    nullable: true,
  })
  slackChannelId: string | null;

  @ApiProperty({
    type: 'string',
    description: 'Slack channel name',
    nullable: true,
  })
  slackChannelName: string | null;

  @ApiProperty({ type: 'string', description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ type: 'string', description: 'updatedAt' })
  updatedAt: Date;
}

export class MatchResponseDto extends MatchRelationalResponseDto {
  @ApiProperty({
    type: () => UserResponseDto,
    description: 'Project Pitch Owner',
  })
  projectOwner: UserResponseDto;

  @ApiProperty({
    type: () => UserResponseDto,
    description: 'Collaborator',
  })
  collaboratingUser: UserResponseDto;

  @ApiProperty({
    type: () => ProjectPitchRelationalResponseDto,
    description: 'Project Pitch',
  })
  projectPitch: ProjectPitchRelationalResponseDto;
}

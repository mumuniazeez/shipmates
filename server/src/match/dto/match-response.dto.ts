import { ApiProperty } from '@nestjs/swagger';
import { MatchStatus } from 'generated/prisma';

export class MatchResponseDto {
  @ApiProperty({ type: 'string', description: 'id of the match' })
  id: string;

  @ApiProperty({ type: 'string', description: 'Project Pitch Owner user id' })
  projectOwnerId: string;

  @ApiProperty({ type: 'string', description: 'Collaborator user id' })
  collaboratingUserId: string;

  @ApiProperty({ type: 'string', description: 'Project Pitch id' })
  projectPitchId: string;

  @ApiProperty({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    enum: MatchStatus,
    description: 'Project Pitch id',
  })
  matchStatus: MatchStatus;
}

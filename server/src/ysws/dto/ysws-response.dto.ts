import { ApiProperty } from '@nestjs/swagger';

enum YswsStatusEnum {
  active = 'active',
  ended = 'ended',
  draft = 'draft',
}

type YswsStatus = 'active' | 'ended' | 'draft';

export class YsWsResponseDto {
  @ApiProperty({ type: 'string', description: 'Name of the YSWS program' })
  name: string;
  @ApiProperty({ type: 'string', description: 'When the YSWS  program ends' })
  deadline: string;
  @ApiProperty({
    type: 'string',
    description: 'Description of the YSWS program',
  })
  description: string;
  @ApiProperty({
    type: 'string',
    description: 'Website of the YSWS program',
    nullable: true,
  })
  website: string;
  @ApiProperty({
    type: 'string',
    description: 'Slack channel link for the YSWS program',
    nullable: true,
  })
  slack: string;
  @ApiProperty({
    type: 'string',
    description:
      'Slack channel name for the YSWS program (begins with # i.e #shipmates)',
    nullable: true,
  })
  slackChannel: string;
  @ApiProperty({
    type: 'string',
    enum: YswsStatusEnum,
    description: 'Status of the YSWS program',
  })
  status: YswsStatus;
}

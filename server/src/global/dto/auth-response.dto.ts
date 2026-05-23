import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'The access token to be used for authenticated requests',
  })
  access_token!: string;
  @ApiProperty({
    type: 'string',
    description: 'Type of token (Bearer)',
  })
  token_type!: string;
  @ApiProperty({
    type: 'string',
    description: 'Expiration time of the access token',
  })
  expires_in!: number;
  @ApiProperty({
    type: 'string',
    description:
      'The refresh token to be used for renew access token (can only be used once)',
  })
  refresh_token!: string;
  @ApiProperty({
    type: 'string',
    description: 'Authentication request scope',
  })
  scope!: string;
}

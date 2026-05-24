import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class GetNewAccessTokenDto {
  @ApiProperty({
    type: 'string',
    description: 'Refresh token to generate a new access token',
  })
  @IsJWT()
  refresh_token!: string;
}

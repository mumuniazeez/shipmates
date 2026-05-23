import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from 'src/global/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({
    summary: 'Sign in with Hack Club Auth',
    description: `Redirects the user to the Hack Club Auth sign in page<br>After the user authorizes your app, they'll be redirected to your redirect URI with an authorization code:
https://yourapp.com/callback?code=abc123def456`,
  })
  @ApiQuery({
    name: 'redirect_uri',
    description: 'The URI to redirect to after signing in',
    required: true,
  })
  @Get('hackclubauth')
  @Redirect()
  hackClubAuth(@Query('redirect_uri') redirect_uri: string) {
    return this.authService.hackClubAuth(redirect_uri);
  }

  @ApiOperation({
    summary: 'Exchange the code for an access token',
    description: `Exchange the code for an access token`,
  })
  @ApiResponse({ type: AuthResponseDto, status: 200 })
  @ApiQuery({
    name: 'code',
    description:
      'The code return from the redirect from the Hack Club Auth sign in page',
    required: true,
  })
  @ApiQuery({
    name: 'redirect_uri',
    description: 'The URI to redirect to after signing in',
    required: true,
  })
  @Get('hackclubauth/callback')
  hackClubAuthCallback(
    @Query('code') code: string,
    @Query('redirect_uri') redirect_uri: string,
  ) {
    return this.authService.hackClubAuthCallback(redirect_uri, code);
  }
}

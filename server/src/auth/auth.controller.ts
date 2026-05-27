import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import {
  AuthCallbackResponseDto,
  GetNewAccessTokenResponseDto,
} from './dto/auth-response.dto';
import { GetNewAccessTokenDto } from './dto/auth.dto';
import { Throttle } from '@nestjs/throttler';

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
  @ApiResponse({ type: AuthCallbackResponseDto, status: 200 })
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

  @ApiOperation({
    summary: 'Get a new access token with a refresh token',
    description: `Get a new access token with a refresh token, 4 request per hour for each user, if the limit is exceeded, the user will be blocked for 2 hours to prevent abuse`,
  })
  @ApiResponse({ type: GetNewAccessTokenResponseDto, status: 200 })
  @Throttle({ default: { limit: 4, ttl: 3600000, blockDuration: 7200000 } })
  @HttpCode(HttpStatus.OK)
  @Post('token/refresh')
  getNewAccessToken(@Body() getNewAccessTokenDto: GetNewAccessTokenDto) {
    return this.authService.getNewAccessToken(
      getNewAccessTokenDto.refresh_token,
    );
  }
}

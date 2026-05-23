import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  hackClubAuth(redirect_uri: string) {
    const client_id = this.config.get<string>('HACKCLUB_AUTH_CLIENT_ID');

    return {
      url: `https://auth.hackclub.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email profile slack_id verification_status`,
    };
  }
  async hackClubAuthCallback(redirect_uri: string, code: string) {
    const client_id = this.config.get<string>('HACKCLUB_AUTH_CLIENT_ID');
    const client_secret = this.config.get<string>(
      'HACKCLUB_AUTH_CLIENT_SECRET',
    );

    const reqBody = {
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type: 'authorization_code',
    };

    const res = await this.httpService.axiosRef.post(
      'https://auth.hackclub.com/oauth/token',
      reqBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return res.data;
  }
}

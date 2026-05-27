import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'generated/prisma';
import {
  AuthCallbackResponseDto,
  GetNewAccessTokenResponseDto,
} from './dto/auth-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  hackClubAuth(redirect_uri: string) {
    const client_id = this.config.get<string>('HACKCLUB_AUTH_CLIENT_ID');

    return {
      url: `https://auth.hackclub.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=email+profile+slack_id+verification_status`,
    };
  }

  async hackClubAuthCallback(
    redirect_uri: string,
    code: string,
  ): Promise<AuthCallbackResponseDto> {
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

    const oauthRes = await this.httpService.axiosRef.post<
      AuthCallbackResponseDto & { id_token: string }
    >('https://auth.hackclub.com/oauth/token', reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (oauthRes.status !== 200)
      throw new InternalServerErrorException(
        `Failed to exchange code for token: ${oauthRes.status} ${oauthRes.statusText}`,
      );

    // get user data from hack club auth
    const userDataFromHackClubAuth = await this.httpService.axiosRef.get<{
      identity: {
        ysws_eligible: boolean;
        primary_email: string;
        id: string;
        slack_id: string | null;
      };
    }>('https://auth.hackclub.com/api/v1/me', {
      headers: {
        Authorization: `Bearer ${oauthRes.data.access_token}`,
      },
    });

    if (userDataFromHackClubAuth.status !== 200)
      throw new InternalServerErrorException(
        `Failed to retrieve user data from hack club auth: ${userDataFromHackClubAuth.status} ${userDataFromHackClubAuth.statusText}`,
      );

    // check if user is eligible to signup
    if (!userDataFromHackClubAuth.data.identity.ysws_eligible)
      throw new UnauthorizedException(
        'You are not eligible to use this platform',
      );
    // get user data from public slack api using Cachet
    const userDataFromSlack = await this.httpService.axiosRef.get<{
      displayName: string;
      imageUrl: string;
    }>(
      `https://cachet.dunkirk.sh/users/${userDataFromHackClubAuth.data.identity.slack_id}`,
    );

    if (userDataFromSlack.status !== 200)
      throw new InternalServerErrorException(
        `Failed to retrieve user data from hack club auth: ${userDataFromHackClubAuth.status} ${userDataFromHackClubAuth.statusText}`,
      );

    let user: User;
    // check if user exist
    const userExist = await this.prisma.user.findUnique({
      where: { email: userDataFromHackClubAuth.data.identity.primary_email },
    });

    // create user if not exist

    if (!userExist)
      user = await this.prisma.user.create({
        data: {
          email: userDataFromHackClubAuth.data.identity.primary_email,
          firstName: userDataFromSlack.data.displayName.split(' ')[0] || null,
          lastName: userDataFromSlack.data.displayName.split(' ')[1] || null,
          hcId: userDataFromHackClubAuth.data.identity.id,
          slackId: userDataFromHackClubAuth.data.identity.slack_id,
          yswsEligible: userDataFromHackClubAuth.data.identity.ysws_eligible,
          profileImg: userDataFromSlack.data.imageUrl,
        },
      });
    else
      user = await this.prisma.user.update({
        where: { email: userDataFromHackClubAuth.data.identity.primary_email },
        data: {
          firstName: userDataFromSlack.data.displayName.split(' ')[0] || null,
          lastName: userDataFromSlack.data.displayName.split(' ')[1] || null,
          yswsEligible: userDataFromHackClubAuth.data.identity.ysws_eligible,
          profileImg: userDataFromSlack.data.imageUrl,
        },
      });

    // generate a jwt token containing the user id and return it to the client
    const payload = {
      id: user.id,
      email: user.email,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.config.get('ACCESS_JWT_TOKEN_SECRET'),
      expiresIn: '30mins',
    });
    // TODO: Make refresh token can only be used once
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.config.get('REFRESH_JWT_TOKEN_SECRET'),
      expiresIn: '60days',
    });

    return { access_token, refresh_token };
  }

  async getNewAccessToken(
    refresh_token: string,
  ): Promise<GetNewAccessTokenResponseDto> {
    // TODO: Make refresh token can only be used once
    const payload = this.jwtService.verify<{
      id: string;
      email: string;
    }>(refresh_token, {
      secret: this.config.get('REFRESH_JWT_TOKEN_SECRET'),
    });

    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) throw new UnauthorizedException('User not found');

    // generate a new access token
    const new_access_token = this.jwtService.sign(
      {
        id: user.id,
        email: user.email,
      },
      {
        secret: this.config.get('ACCESS_JWT_TOKEN_SECRET'),
        expiresIn: '30mins',
      },
    );

    return { access_token: new_access_token };
  }
}

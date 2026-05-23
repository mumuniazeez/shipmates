import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.get('NODE_ENV') === 'development',
      secretOrKey: config.get('ACCESS_JWT_TOKEN_SECRET')!,
    });
  }
  async validate(payload: { id: string; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email, id: payload.id },
    });

    return user;
  }
}

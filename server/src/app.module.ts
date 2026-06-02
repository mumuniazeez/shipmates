import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';

import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProjectPitchModule } from './project-pitch/project-pitch.module';
import { SkillModule } from './skill/skill.module';
import { YswsModule } from './ysws/ysws.module';
import { SlackModule } from './slack/slack.module';
import { MatchModule } from './match/match.module';

@Module({
  imports: [
    // Nestjs modules
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      // Rate limiting for all request: 30 request per minute, block for 2 minute if limit is exceeded
      throttlers: [{ limit: 30, ttl: 60000, blockDuration: 120000 }],
      errorMessage: 'Too many request from your device, try again later',
    }),

    // Custom service module
    PrismaModule,
    MailerModule,
    SlackModule,

    // Routes Module
    HealthModule,
    AuthModule,
    UserModule,
    ProjectPitchModule,
    MatchModule,
    SkillModule,
    YswsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}

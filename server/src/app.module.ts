import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Nestjs modules
    ConfigModule.forRoot({ isGlobal: true }),

    // Custom service module
    PrismaModule,
    MailerModule,

    // Routes Module
    HealthModule,

    AuthModule,
  ],
})
export class AppModule {}

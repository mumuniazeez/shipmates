import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    // Nestjs modules
    ConfigModule.forRoot({ isGlobal: true }),

    // Custom service module
    PrismaModule,
    MailerModule,

    // Routes Module
    HealthModule,
  ],
})
export class AppModule {}

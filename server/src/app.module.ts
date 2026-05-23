import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { MailerModule } from './mailer/mailer.module';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [PrismaModule, MailerModule, HealthCheckModule],
})
export class AppModule {}

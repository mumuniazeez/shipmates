import {
  InternalServerErrorException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { HealthCheckDto } from 'src/global/dto';
import { MailerService } from 'src/mailer/mailer.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  async healthCheck(): Promise<HealthCheckDto> {
    //   try to connect to database
    const healthCheckResult: HealthCheckDto = { checks: [] };
    try {
      await this.prisma.$connect();
      const res: boolean = await this.prisma.$queryRaw`SELECT 1=1`;
      await this.prisma.$disconnect();
      if (!res) throw new Error('Failed to connect to database');
      healthCheckResult.checks.push({
        name: 'DB Connection',
        status: 'successful',
      });
    } catch (error) {
      Logger.error(error, 'HealthCheckService');
      healthCheckResult.checks.push({
        name: 'DB Connection',
        status: 'failed',
      });
    }

    // If any check fails
    if (healthCheckResult.checks.find((c) => c.status === 'failed'))
      throw new InternalServerErrorException(healthCheckResult);

    return healthCheckResult;
  }
}

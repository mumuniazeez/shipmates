import { Injectable } from '@nestjs/common';
import { HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly heath: HealthCheckService,
    private readonly prismaHealth: PrismaHealthIndicator,
  ) {}

  healthCheck() {
    return this.heath.check([
      async () => this.prismaHealth.pingCheck('database', this.prisma),
    ]);
  }
}

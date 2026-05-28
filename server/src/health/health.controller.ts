import { Controller, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthService } from './health.service';
import { Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';
import { ApiOperation } from '@nestjs/swagger';

@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(private readonly healthCheckService: HealthService) {}

  @ApiOperation({
    summary: 'Check if server is running',
    description:
      'Check if server is up and running, check if database is running',
    operationId: 'healthCheck',
  })
  @Get()
  @HealthCheck()
  healthCheck() {
    return this.healthCheckService.healthCheck();
  }
}

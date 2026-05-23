import { Controller } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheckDto } from 'src/global/dto';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}
  @ApiResponse({
    status: 200,
    type: HealthCheckDto,
    description: 'Returns 200 if all check passed during health check',
  })
  @ApiResponse({
    status: 500,
    type: HealthCheckDto,
    description: 'Returns 500 if any check failed during health check',
    example: { checks: [{ name: 'Test 1', status: 'failed' }] },
  })
  @ApiOperation({
    summary: 'Check if server is running',
    description:
      'Check if server is up and running, check if database is running',
    operationId: 'healthCheck',
  })
  @Get()
  healthCheck() {
    return this.healthCheckService.healthCheck();
  }
}

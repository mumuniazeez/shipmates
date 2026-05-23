import { ApiProperty } from '@nestjs/swagger';

enum HealthCheckStatus {
  successful = 'successful',
  failed = 'failed',
}

export class CheckDto {
  @ApiProperty({
    type: 'string',
    description: 'Name of the check',
    example: 'Test 1',
  })
  name: string;

  @ApiProperty({
    description: 'Status of the check',
    enum: HealthCheckStatus,
    examples: ['successful', 'failed'],
  })
  status: 'successful' | 'failed';
}

export class HealthCheckDto {
  @ApiProperty({
    description: 'Checks done during health check',
    type: [CheckDto],
  })
  checks: CheckDto[];
}

import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export class ErrorMessageDto {
  @ApiProperty({
    description: `
    HTTP status code to be expected and their meanings

    200 - Request was successful

    201 - Request was successful and a new resource was created

    400 - Request failed due to bad request, invalid data, or request body syntax error

    401 - Unauthorized request (Request requires authentication)

    403 - Request was authorized but cannot be completed (e.g due to roles restrictions)

    404 - Resource not found

    422 - Request was received but cannot be processed

    500 - Internal Server error
    `,
    examples: [200, 201, 400, 401, 403, 404, 422, 500],
  })
  @ApiResponseProperty({ type: 'number' })
  statusCode: number;

  @ApiProperty({
    description: 'Human readable error message',
    examples: ['User not found', 'Invalid Credential'],
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  message: string | string[];
  @ApiProperty({
    required: false,
    description: 'Machine readable error message',
    examples: ['NotFound', 'Unauthorized'],
  })
  @ApiResponseProperty({ type: 'string' })
  error?: string;
}

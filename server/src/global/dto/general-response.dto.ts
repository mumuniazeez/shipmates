import { ApiProperty } from '@nestjs/swagger';

export class GeneralOkResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Human readable message',
    examples: ['Item deleted successfully', 'Item created successfully'],
  })
  message: string;
}

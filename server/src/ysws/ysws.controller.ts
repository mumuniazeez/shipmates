import { Controller, Get, Query } from '@nestjs/common';
import { YswsService } from './ysws.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { YsWsResponseDto } from './dto/ysws-response.dto';

@Controller('ysws')
export class YswsController {
  constructor(private readonly yswsService: YswsService) {}

  @ApiOperation({
    summary: 'Find all YSWS program',
    description: 'Find all YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @Get()
  findAll() {
    return this.yswsService.findAll();
  }
  @ApiOperation({
    summary: 'Find all active YSWS program',
    description: 'Find all active YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @Get('active')
  findActive() {
    return this.yswsService.findActive();
  }

  @ApiOperation({
    summary: 'Find all ended YSWS program',
    description: 'Find all ended YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @Get('ended')
  findEnded() {
    return this.yswsService.findEnded();
  }

  @ApiOperation({
    summary: 'Search YSWS program (name, description)',
    description: 'Search YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @ApiQuery({ name: 'q', description: 'Query to search for' })
  @Get('search')
  search(@Query('q') q: string) {
    return this.yswsService.search(q);
  }
}

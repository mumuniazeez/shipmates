import { Controller, Get, Query } from '@nestjs/common';
import { YswsService } from './ysws.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { YsWsResponseDto } from './dto/ysws-response.dto';

@Controller('ysws')
export class YswsController {
  constructor(private readonly yswsService: YswsService) {}

  @ApiOperation({
    summary: 'Get all YSWS program',
    description: 'Get all YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @Get()
  getAllYswsProgram() {
    return this.yswsService.getAllYswsProgram();
  }
  @ApiOperation({
    summary: 'Get all active YSWS program',
    description: 'Get all active YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @Get('active')
  getActiveYswsProgram() {
    return this.yswsService.getActiveYswsProgram();
  }

  @ApiOperation({
    summary: 'Get all ended YSWS program',
    description: 'Get all ended YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @Get('ended')
  getEndedYswsProgram() {
    return this.yswsService.getEndedYswsProgram();
  }

  @ApiOperation({
    summary: 'Search YSWS program (name, description)',
    description: 'Search YSWS program on https://ysws.hackclub.com',
  })
  @ApiResponse({ type: [YsWsResponseDto], status: 200 })
  @ApiQuery({ name: 'q', description: 'Query to search for' })
  @Get('search')
  searchYswsProgram(@Query('q') q: string) {
    return this.yswsService.searchYswsProgram(q);
  }
}

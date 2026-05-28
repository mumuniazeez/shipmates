import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SkillResponseDto } from './dto/skill-response.dto';

@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({
    summary: 'Create a new skill',
    description: 'Create a new skill',
  })
  @ApiResponse({ type: SkillResponseDto, status: 200 })
  @Post()
  create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(createSkillDto);
  }

  // TODO: Add pagination later
  @ApiOperation({
    summary: 'Find all skills',
    description: 'Find all skills',
  })
  @ApiResponse({ type: [SkillResponseDto], status: 200 })
  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @ApiOperation({
    summary: 'Search for skills',
    description: 'Search for skills',
  })
  @ApiResponse({ type: [SkillResponseDto], status: 200 })
  @Get('/search')
  search(@Query('q') q: string) {
    return this.skillService.search(q);
  }
}

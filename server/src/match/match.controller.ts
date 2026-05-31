import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
import { ProjectPitchResponseDto } from 'src/project-pitch/dto/project-pitch-response.dto';
import { MatchResponseDto } from './dto/match-response.dto';
import { GeneralOkResponseDto } from 'src/global/dto';
import type { User } from 'generated/prisma';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @ApiOperation({
    summary: 'Create a match',
    description: 'Create a match between the users on a project pitch',
  })
  @ApiResponse({
    type: ProjectPitchResponseDto,
    status: 200,
  })
  @Post()
  create(@Body() createMatchDto: CreateMatchDto, @GetUser() user: User) {
    return this.matchService.create(createMatchDto, user);
  }

  @ApiOperation({
    summary: 'Get a project pitch matches',
    description: 'Get all the matches under a project pitch',
  })
  @ApiResponse({
    type: [MatchResponseDto],
    status: 200,
  })
  @Get(':projectPitchId')
  findAll(@Param('projectPitchId', ParseUUIDPipe) projectPitchId: string) {
    return this.matchService.findAll(projectPitchId);
  }

  @ApiOperation({
    summary: 'Get a match',
    description: 'Get a matches under a project pitch',
  })
  @ApiResponse({
    type: MatchResponseDto,
    status: 200,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchService.findOne(id);
  }

  @ApiOperation({
    summary: 'Delete a match',
    description: 'Delete a matches under a project pitch',
  })
  @ApiResponse({
    type: GeneralOkResponseDto,
    status: 200,
  })
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.matchService.remove(id, userId);
  }
}

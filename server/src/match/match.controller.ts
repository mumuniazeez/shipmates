import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';
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
    type: MatchResponseDto,
    status: 200,
  })
  @Post()
  create(@Body() createMatchDto: CreateMatchDto, @GetUser() user: User) {
    return this.matchService.create(createMatchDto, user);
  }

  @ApiOperation({
    summary: 'Get all matches relating to current user',
    description:
      'Get all the matches relating to the current authenticated user',
  })
  @ApiResponse({
    type: [MatchResponseDto],
    status: 200,
  })
  @Get('me')
  findAllRelatingToMe(@GetUser('id') userId: string) {
    return this.matchService.findAllRelatingToMe(userId);
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
    summary: 'Confirm a match',
    description:
      'Confirm a match under a project pitch, this will spawn up a slack channel, notify the users about the match and set match status to "matching"',
  })
  @ApiResponse({
    type: MatchResponseDto,
    status: 200,
  })
  @Patch(':id/confirm')
  confirmMatching(
    @Param('id', ParseUUIDPipe) matchId: string,
    @GetUser() user: User,
  ) {
    return this.matchService.confirmMatching(matchId, user);
  }

  @ApiOperation({
    summary: 'Finalize a match',
    description:
      'Finalize a match under a project pitch, this will set the match status to "accepted" and notify the users about the match finalization',
  })
  @ApiResponse({
    type: MatchResponseDto,
    status: 200,
  })
  @Patch(':id/finalize')
  finalizeMatching(
    @Param('id', ParseUUIDPipe) matchId: string,
    @GetUser() user: User,
  ) {
    return this.matchService.finalizeMatching(matchId, user);
  }

  @ApiOperation({
    summary: 'Cancel or Reject a match',
    description:
      'Cancel or Reject a matches under a project pitch, this will set the match status to "cancelled" and archive the slack channel if one was created',
  })
  @ApiResponse({
    type: GeneralOkResponseDto,
    status: 200,
  })
  @Delete(':id')
  cancelOrReject(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.matchService.cancelOrReject(id, userId);
  }
}

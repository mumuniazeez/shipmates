import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectPitchService } from './project-pitch.service';
import { CreateProjectPitchDto } from './dto/create-project-pitch.dto';
import { UpdateProjectPitchDto } from './dto/update-project-pitch.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectPitchResponseDto } from './dto/project-pitch-response.dto';
import { GetUser } from 'src/auth/decorator';
import { GeneralOkResponseDto } from 'src/global/dto';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('project-pitch')
export class ProjectPitchController {
  constructor(private readonly projectPitchService: ProjectPitchService) {}

  @ApiOperation({
    summary: 'Create a new project pitch',
    description:
      'Create a new project pitch for a project that needs to be built',
  })
  @ApiResponse({
    status: 201,
    type: ProjectPitchResponseDto,
  })
  @Post()
  create(
    @Body() createProjectPitchDto: CreateProjectPitchDto,
    @GetUser('id') userId: string,
  ) {
    return this.projectPitchService.create(createProjectPitchDto, userId);
  }

  @ApiOperation({
    summary: 'Find all project pitch',
    description: 'Find all project pitch',
  })
  @ApiResponse({
    status: 200,
    type: [ProjectPitchResponseDto],
  })
  @Get()
  findAll() {
    return this.projectPitchService.findAll();
  }

  @ApiOperation({
    summary: 'Find all project pitch created by the current user',
    description: 'Find all project pitch created by the current user',
  })
  @ApiResponse({
    status: 200,
    type: [ProjectPitchResponseDto],
  })
  @Get('me')
  findMyProjectPitches(@GetUser('id') userId: string) {
    return this.projectPitchService.findMyProjectPitches(userId);
  }

  @ApiOperation({
    summary: 'Find one project pitch',
    description: 'Find a project pitch by id',
  })
  @ApiResponse({
    status: 200,
    type: ProjectPitchResponseDto,
  })
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.projectPitchService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update a project pitch',
    description: 'Update a project pitch',
  })
  @ApiResponse({
    status: 200,
    type: ProjectPitchResponseDto,
  })
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProjectPitchDto: UpdateProjectPitchDto,
    @GetUser('id') userId: string,
  ) {
    return this.projectPitchService.update(id, updateProjectPitchDto, userId);
  }

  @ApiOperation({
    summary: 'Delete a project pitch',
    description: 'Delete a project pitch',
  })
  @ApiResponse({
    status: 200,
    type: GeneralOkResponseDto,
  })
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return this.projectPitchService.remove(id, userId);
  }
}

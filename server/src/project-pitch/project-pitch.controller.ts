import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectPitchService } from './project-pitch.service';
import { CreateProjectPitchDto } from './dto/create-project-pitch.dto';
import { UpdateProjectPitchDto } from './dto/update-project-pitch.dto';
import { JwtGuard } from 'src/auth/guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectPitchResponseDto } from './dto/project-pitch-response.dto';

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
  create(@Body() createProjectPitchDto: CreateProjectPitchDto) {
    return this.projectPitchService.create(createProjectPitchDto);
  }

  @Get()
  findAll() {
    return this.projectPitchService.findAll();
  }

  @Get('me')
  findMyProjectPitches() {
    // return this.projectPitchService.findOne(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectPitchService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectPitchDto: UpdateProjectPitchDto,
  ) {
    return this.projectPitchService.update(+id, updateProjectPitchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectPitchService.remove(+id);
  }
}

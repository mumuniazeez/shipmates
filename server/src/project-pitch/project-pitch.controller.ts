import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectPitchService } from './project-pitch.service';
import { CreateProjectPitchDto } from './dto/create-project-pitch.dto';
import { UpdateProjectPitchDto } from './dto/update-project-pitch.dto';

@Controller('project-pitch')
export class ProjectPitchController {
  constructor(private readonly projectPitchService: ProjectPitchService) {}

  @Post()
  create(@Body() createProjectPitchDto: CreateProjectPitchDto) {
    return this.projectPitchService.create(createProjectPitchDto);
  }

  @Get()
  findAll() {
    return this.projectPitchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectPitchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectPitchDto: UpdateProjectPitchDto) {
    return this.projectPitchService.update(+id, updateProjectPitchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectPitchService.remove(+id);
  }
}

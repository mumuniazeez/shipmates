import { Injectable } from '@nestjs/common';
import { CreateProjectPitchDto } from './dto/create-project-pitch.dto';
import { UpdateProjectPitchDto } from './dto/update-project-pitch.dto';

@Injectable()
export class ProjectPitchService {
  create(createProjectPitchDto: CreateProjectPitchDto) {
    return 'This action adds a new projectPitch';
  }

  findAll() {
    return `This action returns all projectPitch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectPitch`;
  }

  update(id: number, updateProjectPitchDto: UpdateProjectPitchDto) {
    return `This action updates a #${id} projectPitch`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectPitch`;
  }
}

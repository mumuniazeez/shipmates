import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectPitchDto } from './dto/create-project-pitch.dto';
import { UpdateProjectPitchDto } from './dto/update-project-pitch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectPitchResponseDto } from './dto/project-pitch-response.dto';

@Injectable()
export class ProjectPitchService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createProjectPitchDto: CreateProjectPitchDto,
    userId: string,
  ): Promise<ProjectPitchResponseDto> {
    const projectPitch = await this.prisma.projectPitch.create({
      data: {
        title: createProjectPitchDto.projectTitle,
        description: createProjectPitchDto.pitchDescription,
        skillsNeeded: {
          connect: createProjectPitchDto.skills.map((skill) => {
            return { id: skill.id };
          }),
          create: createProjectPitchDto.newSkills.map((skill) => {
            return { name: skill };
          }),
        },
        userId,
      },
      include: { skillsNeeded: true, user: true },
    });

    return projectPitch;
  }

  findAll() {
    return `This action returns all projectPitch`;
  }

  findMyProjectPitches(userId: string) {
    return 'hahaha coming soon';
  }

  async findOne(id: string): Promise<ProjectPitchResponseDto> {
    const projectPitch = await this.prisma.projectPitch.findFirst({
      where: { id },
      include: { skillsNeeded: true, user: true },
    });

    if (!projectPitch) throw new NotFoundException('Project Ptich not found');

    return projectPitch;
  }

  update(
    id: string,
    updateProjectPitchDto: UpdateProjectPitchDto,
    userId: string,
  ) {
    return `This action updates a #${id} projectPitch`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectPitch`;
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectPitchDto } from './dto/create-project-pitch.dto';
import { UpdateProjectPitchDto } from './dto/update-project-pitch.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectPitchResponseDto } from './dto/project-pitch-response.dto';
import { GeneralOkResponseDto } from 'src/global/dto';

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
          connectOrCreate: createProjectPitchDto.skills.map((skill) => {
            return {
              where: { name: skill.name },
              create: { name: skill.name },
            };
          }),
        },
        userId,
      },
      include: { skillsNeeded: true, user: true },
    });

    return projectPitch;
  }

  // TODO: Add pagination later
  async findAll() {
    const projectPitches = await this.prisma.projectPitch.findMany({
      include: { skillsNeeded: true, user: true },
    });

    if (projectPitches.length === 0)
      throw new NotFoundException('No project pitch yet.');

    return projectPitches;
  }

  // TODO: Add pagination later
  async findMyProjectPitches(userId: string) {
    const projectPitches = await this.prisma.projectPitch.findMany({
      where: { userId },
      include: { skillsNeeded: true, user: true },
    });

    if (projectPitches.length === 0)
      throw new NotFoundException('No project pitch yet.');

    return projectPitches;
  }

  async findOne(id: string): Promise<ProjectPitchResponseDto> {
    const projectPitch = await this.prisma.projectPitch.findUnique({
      where: { id },
      include: { skillsNeeded: true, user: true },
    });

    if (!projectPitch) throw new NotFoundException('Project Pitch not found');

    return projectPitch;
  }

  async update(
    id: string,
    updateProjectPitchDto: UpdateProjectPitchDto,
    userId: string,
  ) {
    const existingPitch = await this.prisma.projectPitch.findUnique({
      where: { id },
      include: { skillsNeeded: true },
    });
    if (!existingPitch) throw new NotFoundException('Project Pitch not found');

    if (existingPitch.userId !== userId)
      throw new ForbiddenException(
        'You do not have the permission to update this pitch',
      );

    const projectPitch = await this.prisma.projectPitch.update({
      data: {
        title: updateProjectPitchDto.projectTitle,
        description: updateProjectPitchDto.pitchDescription,
        skillsNeeded: {
          set: updateProjectPitchDto.skills
            ? updateProjectPitchDto.skills.map((skill) => {
                return { name: skill.name };
              })
            : existingPitch.skillsNeeded.map((skill) => {
                return { name: skill.name };
              }),
        },
        userId,
      },
      include: { skillsNeeded: true, user: true },
      where: { id },
    });

    return projectPitch;
  }

  async remove(id: string, userId: string): Promise<GeneralOkResponseDto> {
    const existingPitch = await this.prisma.projectPitch.findUnique({
      where: { id },
      include: { skillsNeeded: true },
    });
    if (!existingPitch) throw new NotFoundException('Project Pitch not found');

    if (existingPitch.userId !== userId)
      throw new ForbiddenException(
        'You do not have the permission to update this pitch',
      );

    await this.prisma.projectPitch.delete({ where: { id } });
    return { message: 'Project Pitch Deleted' };
  }
}

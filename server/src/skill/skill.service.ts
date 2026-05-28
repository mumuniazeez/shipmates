import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SkillResponseDto } from './dto/skill-response.dto';

@Injectable()
export class SkillService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSkillDto: CreateSkillDto): Promise<SkillResponseDto> {
    const skill = await this.prisma.skill.create({
      data: { name: createSkillDto.name },
    });

    return skill;
  }

  async findAll(): Promise<SkillResponseDto[]> {
    const skills = await this.prisma.skill.findMany({});

    if (skills.length === 0) throw new NotFoundException('No skills yet');

    return skills;
  }

  async search(q: string): Promise<SkillResponseDto[]> {
    const skills = await this.prisma.skill.findMany({
      where: { name: { contains: q, mode: 'insensitive' } },
    });

    if (skills.length === 0) throw new NotFoundException('No result found');

    return skills;
  }
}

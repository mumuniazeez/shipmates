import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectPitchResponseDto } from 'src/project-pitch/dto/project-pitch-response.dto';
import { MatchResponseDto } from './dto/match-response.dto';
import { GeneralOkResponseDto } from 'src/global/dto';
import { SlackService } from 'src/slack/slack.service';
import { User } from 'generated/prisma';

@Injectable()
export class MatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slackService: SlackService,
  ) {}

  async create(
    createMatchDto: CreateMatchDto,
    user: User,
  ): Promise<ProjectPitchResponseDto> {
    const projectPitch = await this.prisma.projectPitch.findUnique({
      where: { id: createMatchDto.projectId },
      include: { user: true },
    });

    if (!projectPitch) throw new NotFoundException('Project Pitch not found');

    const { channelName } = await this.slackService.createMatchHandshake(
      user,
      projectPitch.user,
      projectPitch,
    );

    return await this.prisma.projectPitch.update({
      where: { id: createMatchDto.projectId },
      data: {
        matches: {
          create: {
            projectOwnerId: projectPitch.userId,
            collaboratingUserId: user.id,
            slackChannelName: channelName,
            matchStatus: 'matched',
          },
        },
      },
      include: {
        matches: true,
        skillsNeeded: true,
        user: true,
      },
    });
  }

  async findAll(projectPitchId: string): Promise<MatchResponseDto[]> {
    const projectPitch = await this.prisma.projectPitch.findUnique({
      where: { id: projectPitchId },
    });
    if (!projectPitch) throw new NotFoundException('Project Pitch not found');

    const projectPitchMatches = await this.prisma.match.findMany({
      where: { projectPitchId },
    });

    if (projectPitchMatches.length === 0)
      throw new NotFoundException('No matched yet');

    return projectPitchMatches;
  }

  async findOne(id: string): Promise<MatchResponseDto> {
    const projectPitchMatch = await this.prisma.match.findUnique({
      where: { id },
    });

    if (!projectPitchMatch) throw new NotFoundException('No matched yet');

    return projectPitchMatch;
  }

  async remove(id: string, userId: string): Promise<GeneralOkResponseDto> {
    const projectPitchMatch = await this.prisma.match.findUnique({
      where: { id },
    });

    if (!projectPitchMatch) throw new NotFoundException('No matched yet');

    if (projectPitchMatch.collaboratingUserId !== userId)
      throw new ForbiddenException(
        "You don't have the permission to cancel this match",
      );

    await this.prisma.projectPitch.delete({ where: { id } });
    return { message: 'Match Canceled' };
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MatchResponseDto } from './dto/match-response.dto';
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
  ): Promise<MatchResponseDto> {
    const projectPitch = await this.prisma.projectPitch.findUnique({
      where: { id: createMatchDto.projectId },
      include: {
        user: true,
        matches: { where: { collaboratingUserId: user.id } },
      },
    });

    if (!projectPitch) throw new NotFoundException('Project Pitch not found');

    if (projectPitch.userId === user.id)
      throw new ForbiddenException("You can't match with yourself, silly!");

    if (projectPitch.matches.length > 0)
      throw new UnprocessableEntityException(
        'You have already matched on this project',
      );

    return await this.prisma.match.create({
      data: {
        projectPitchId: projectPitch.id,
        projectOwnerId: projectPitch.userId,
        collaboratingUserId: user.id,
      },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });
  }

  async findAllRelatingToMe(userId: string): Promise<MatchResponseDto[]> {
    const projectPitchMatches = await this.prisma.match.findMany({
      where: {
        OR: [{ collaboratingUserId: userId }, { projectOwnerId: userId }],
      },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });

    if (projectPitchMatches.length === 0)
      throw new NotFoundException('No matched yet');

    return projectPitchMatches;
  }

  async findAll(projectPitchId: string): Promise<MatchResponseDto[]> {
    const projectPitch = await this.prisma.projectPitch.findUnique({
      where: { id: projectPitchId },
    });
    if (!projectPitch) throw new NotFoundException('Project Pitch not found');

    const projectPitchMatches = await this.prisma.match.findMany({
      where: { projectPitchId },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });

    if (projectPitchMatches.length === 0)
      throw new NotFoundException('No matched yet');

    return projectPitchMatches;
  }

  async findOne(id: string): Promise<MatchResponseDto> {
    const projectPitchMatch = await this.prisma.match.findUnique({
      where: { id },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });

    if (!projectPitchMatch) throw new NotFoundException('No matched yet');

    return projectPitchMatch;
  }

  async confirmMatching(
    matchId: string,
    user: User,
  ): Promise<MatchResponseDto> {
    const projectPitchMatch = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });

    if (!projectPitchMatch) throw new NotFoundException('No matched yet');

    if (projectPitchMatch.projectOwnerId !== user.id)
      throw new ForbiddenException(
        "You don't have the permission to confirm this match",
      );

    const { channelName, channelId } =
      await this.slackService.createMatchHandshake(
        projectPitchMatch.projectOwner,
        projectPitchMatch.collaboratingUser,
        projectPitchMatch.projectPitch,
      );

    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        matchStatus: 'matching',
        slackChannelId: channelId,
        slackChannelName: channelName,
      },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });
  }

  async finalizeMatching(
    matchId: string,
    user: User,
  ): Promise<MatchResponseDto> {
    const projectPitchMatch = await this.prisma.match.findUnique({
      where: { id: matchId },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });

    if (!projectPitchMatch) throw new NotFoundException('No matched yet');

    if (projectPitchMatch.projectOwnerId !== user.id)
      throw new ForbiddenException(
        "You don't have the permission to finalize this match",
      );

    await this.slackService.sendFinalization(
      projectPitchMatch.slackChannelId!,
      projectPitchMatch.projectOwner,
    );

    return this.prisma.match.update({
      where: { id: matchId },
      data: {
        matchStatus: 'accepted',
      },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });
  }

  async cancelOrReject(id: string, userId: string): Promise<MatchResponseDto> {
    const projectPitchMatch = await this.prisma.match.findUnique({
      where: { id },
    });

    if (!projectPitchMatch) throw new NotFoundException('No matched yet');

    // Discover if it's a cancel by the collaborator or reject by the project owner
    const newProjectPitchMatch = await this.prisma.match.update({
      where: { id },
      data: {
        matchStatus:
          projectPitchMatch.collaboratingUserId === userId
            ? 'cancelled'
            : 'rejected',
      },
      include: {
        projectOwner: true,
        collaboratingUser: true,
        projectPitch: true,
      },
    });

    if (projectPitchMatch.slackChannelId)
      await this.slackService.archiveChannel(projectPitchMatch.slackChannelId);

    return newProjectPitchMatch;
  }
}

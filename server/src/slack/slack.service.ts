import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WebClient } from '@slack/web-api';
import { ProjectPitch, User } from 'generated/prisma';

@Injectable()
export class SlackService {
  slackClient: WebClient;
  constructor(private readonly config: ConfigService) {
    this.slackClient = new WebClient(config.get('SLACK_BOT_OAUTH_TOKEN'));
  }

  async createMatchHandshake(
    userA: User,
    userB: User,
    projectPitch: ProjectPitch,
  ) {
    const uniqueSuffix = Math.random().toString(36).substring(2, 6);
    const sanitizedTitle = projectPitch.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-');
    const channelName = `ship-${sanitizedTitle}-${uniqueSuffix}`.slice(0, 80);

    const maxSlackLength = 2950;
    const cleanDescription =
      projectPitch.description.length > maxSlackLength
        ? `${projectPitch.description.slice(0, maxSlackLength)}...`
        : projectPitch.description;

    const channelResult = await this.slackClient.conversations.create({
      name: channelName,
      is_private: true,
    });

    if (!channelResult.ok || !channelResult.channel?.id)
      throw new InternalServerErrorException(
        `Slack API failed to open conversation: ${channelResult.error}`,
      );
    const channelId = channelResult.channel.id;

    await this.slackClient.conversations.invite({
      channel: channelId,
      users: `${userA.slackId},${userB.slackId}`,
    });

    await this.slackClient.chat.postMessage({
      channel: channelId,
      text: 'Crew Assemble!',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `👋 Ahoy <@${userA.slackId}> and <@${userB.slackId}>!\n\nYou both just mutually matched on *Shipmates* to collaborate on the project:\n🔥 *"${projectPitch.title}"*`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${cleanDescription}`,
          },
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `Get talking, set up your GitHub repository, assign tasks, and go ship something epic! 🚀`,
          },
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `_Tip: Use this group DM to sync up. I'll stay out of your way!_`,
            },
          ],
        },
      ],
    });

    return { channelId, channelName };
  }

  async archiveChannel(channelId: string) {
    await this.slackClient.conversations.archive({ channel: channelId });
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';
import { Resend } from 'resend';
import fs from 'fs';
import Handlebars from 'handlebars';

@Injectable()
export class MailerService extends Resend {
  constructor(private config: ConfigService) {
    super(config.get('RESEND_API_KEY'));
    Handlebars.registerHelper('eq', (a, b) => a === b);
  }

  async sendEmail(subject: string, to: string, html: string) {
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const { error } = await this.emails.send({
          from: `"Shipmates" <${this.config.get('EMAIL_USER')}>`,
          to,
          subject,
          html,
        });
        if (error) {
          // eslint-disable-next-line @typescript-eslint/only-throw-error
          throw error;
        }
        return;
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          throw error;
        }
      }
    }
  }

  /**
   * Extract and compile email template
   */
  generateEmailString(
    /** Name of the `hbs` file in `emails` folder located on root directory (without extension) */
    hbsTemplate: string,
    /** Data to inject into the template */
    payload: Record<string, any>,
  ): string {
    try {
      // Construct the full path to the template
      const filePath = path.join('emails', `${hbsTemplate}.hbs`);

      // Read template file
      const templateSource = fs.readFileSync(filePath, 'utf-8');

      // Compile with Handlebars
      const template = Handlebars.compile(templateSource);

      // Inject payload
      const emailHtml = template(payload);

      return emailHtml;
    } catch (error) {
      Logger.error('Error generating email string', 'MailerService', error);
      throw error;
    }
  }
}

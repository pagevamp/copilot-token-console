import type { CopilotAPI as SDK } from 'copilot-node-sdk';
import { copilotApi } from 'copilot-node-sdk';

import { copilotAPIKey } from '@/config';
import { Token, TokenSchema } from '@/types/token.dto';
import { NotificationType } from '@/types/notification.dto';

export class CopilotApi {
  private copilot: SDK;

  constructor(private token: string) {
    this.copilot = copilotApi({ apiKey: copilotAPIKey, token });
  }

  // Get Token Payload from copilot request token
  async getTokenPayload(): Promise<Token | null> {
    const getTokenPayload = this.copilot.getTokenPayload;
    if (!getTokenPayload) {
      console.error(`Failed to parse token: ${this.token}`);
      return null;
    }

    return TokenSchema.parse(await getTokenPayload());
  }

  async triggerNotification({
    title,
    description,
    senderId,
    recipientId,
  }: NotificationType) {
    const body = {
      deliveryTargets: {
        inProduct: { title, body: description },
      },
      recipientId,
      senderId,
    };
    const triggerNotification = await this.copilot.createNotification({
      requestBody: body,
    });
    if (!triggerNotification) {
      console.error(`Failed to trigger notification: ${this.token}`);
      return null;
    }

    return triggerNotification;
  }
}

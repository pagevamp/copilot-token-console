'use server';
import { postRequest } from '@/helper/axios.helper';
import { copilotAPIKey, copilotBaseAPIUri } from '@/config';
import { NotificationType } from '@/types/notification.dto';
import { CopilotApi } from '@/utils/CopilotApi';

const headers = {
  accept: 'application/json',
  'X-API-KEY': copilotAPIKey,
  'content-type': 'application/json',
};

export const triggerNotification = async (
  payload: NotificationType,
  token: string
) => {
  try {
    const copilotClient = new CopilotApi(token);
    return await copilotClient.triggerNotification(payload);
  } catch (err) {
    console.log({ err });
    return null;
  }
};

'use server';
import { postRequest } from '@/helper/axios.helper';
import { copilotAPIKey, copilotBaseAPIUri } from '@/config';
import { NotificationType } from '@/types/notification.dto';

const headers = {
  accept: 'application/json',
  'X-API-KEY': copilotAPIKey,
  'content-type': 'application/json',
};

export const triggerNotification = async ({
  title,
  description,
  senderId,
  recipientId,
}: NotificationType) => {
  const url = `${copilotBaseAPIUri}/notifications`;

  const data = {
    deliveryTargets: {
      inProduct: { title, body: description },
    },
    recipientId,
    senderId,
  };

  return await postRequest(url, data, headers);
};

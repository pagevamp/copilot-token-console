'use client';
import * as ax from '@/helper/axios.helper';
import { NotificationType } from '@/types/notification.dto';

export const NotificationApiService = {
  getAll: async (headers: Record<string, string>) => {
    return await ax.getRequest(`/api/notification`, headers);
  },
  create: async (data: NotificationType, headers: Record<string, string>) =>
    await ax.postRequest(`/api/notification/create`, data, headers),
  delete: async (id: number, headers: Record<string, string>) =>
    await ax.deleteRequest(`/api/notification/${id}`, headers),
};

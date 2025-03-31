import { PrismaClient } from '@prisma/client';
import { NotificationType } from '@/types/notification.dto';
import { NotificationSelectType } from './notification.controller';

const prisma = new PrismaClient();

export const getNotifications = async (
  where: Record<string, any>,
  select: NotificationSelectType | Record<string, boolean>
) => {
  return await prisma.notification.findMany({
    where,
    select,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export const getNotificationById = async (
  id: number,
  select: NotificationSelectType | Record<string, boolean>
) => {
  return await prisma.notification.findUnique({
    where: {
      id,
      deletedAt: null,
    },
    select,
  });
};

export const createNotification = async (
  data: NotificationType,
  select: NotificationSelectType | Record<string, boolean>
) => {
  return await prisma.notification.create({
    data,
    select,
  });
};

export const deleteNotification = async (
  id: number,
  select: NotificationSelectType | Record<string, boolean>
) => {
  const notification = await getNotificationById(id, select);
  if (!notification) {
    return {
      message: 'Notification not found',
    };
  }
  return await prisma.notification.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
    select,
  });
};

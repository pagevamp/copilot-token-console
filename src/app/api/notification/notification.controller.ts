import { NextRequest, NextResponse } from 'next/server';
import * as notificationService from './notification.service';
import { NotificationSchema, NotificationType } from '@/types/notification.dto';
import httpStatus from 'http-status';

const defaultSelect = {
  id: true,
  title: true,
  senderId: true,
  recipientId: true,
  createdAt: true,
};

export type NotificationSelectType = typeof defaultSelect;

export const getNotifications = async (_req: NextRequest) => {
  const where = {
    deletedAt: null,
  };
  const data = await notificationService.getNotifications(where, defaultSelect);
  return NextResponse.json({ data });
};

export const createNotification = async (req: NextRequest) => {
  const payload: NotificationType = NotificationSchema.parse(await req.json());
  const token = req.headers.get('X-TOKEN') as string;
  const data = await notificationService.createNotification(
    payload,
    defaultSelect,
    token
  );
  return NextResponse.json({ data });
};

export const deleteNotification = async (req: NextRequest) => {
  const id = req.nextUrl.pathname.split('/').pop() || null;

  if (!id) {
    return NextResponse.json(
      { message: 'No id provided' },
      { status: httpStatus.BAD_REQUEST }
    );
  }
  const data = await notificationService.deleteNotification(Number(id), {
    ...defaultSelect,
    deletedAt: true,
  });
  return NextResponse.json({ data });
};

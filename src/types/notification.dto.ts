import { z } from 'zod';

export const NotificationSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string().optional(),
  senderId: z.string(),
  recipientId: z.string(),
});
export type NotificationType = z.infer<typeof NotificationSchema>;

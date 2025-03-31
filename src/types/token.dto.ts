import { z } from 'zod';

export const TokenSchema = z.object({
  clientId: z.string().optional(),
  companyId: z.string().optional(),
  internalUserId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export type Token = z.infer<typeof TokenSchema>;

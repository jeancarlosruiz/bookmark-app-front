import { z } from "zod";

export const tagSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
  title: z.string(),
  userId: z.string(),
  totalBookmarks: z.number(),
});

export type TagsType = z.infer<typeof tagSchema>;

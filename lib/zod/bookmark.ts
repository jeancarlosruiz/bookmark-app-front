import { z } from "zod";
import { tagSchema } from "./tag";

export const bookmarkSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
  title: z.string(),
  url: z.string(),
  favicon: z.string(),
  description: z.string(),
  pinned: z.boolean(),
  isArchived: z.boolean(),
  visitCount: z.number(),
  tags: z.array(tagSchema),
  lastVisited: z.string(),
  userId: z.string(),
});

export type BookmarkType = z.infer<typeof bookmarkSchema>;

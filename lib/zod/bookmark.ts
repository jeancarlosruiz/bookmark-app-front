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

export const CREATE_BOOKMARK_SCHEMA = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
  tags: z.string().transform((tags) => {
    return tags.split(",");
  }),
  favicon: z.string().optional(),
});

export type BookmarkType = z.infer<typeof bookmarkSchema>;
export type CreateBookmarkType = z.infer<typeof CREATE_BOOKMARK_SCHEMA>;

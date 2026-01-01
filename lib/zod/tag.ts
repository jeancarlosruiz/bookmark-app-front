import { z } from "zod";

export const tagSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string(),
  title: z.string().min(1, "Required"),
  userId: z.string(),
  totalBookmarks: z.number(),
});

export const CREATE_TAG_SCHEMA = tagSchema.pick({ title: true });

export type TagsType = z.infer<typeof tagSchema>;
export type CreateTagInput = z.infer<typeof CREATE_TAG_SCHEMA>;

import { TagsType } from "../zod/tag";
import { httpClient } from "./http-client";

/**
 * Tag type definitions
 */
export interface TagResponse {
  message: string;
  data: TagsType[];
}

/**
 * Tag Data Access Layer
 */
export const tagService = {
  /**
   * Get all tags for the current user
   */
  async getUserTags(userId: string): Promise<TagResponse> {
    return httpClient.get<TagResponse>(`/tags/${userId}`);
  },
};

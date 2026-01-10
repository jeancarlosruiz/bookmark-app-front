import { CreateTagInput, TagsType } from "../zod/tag";
import { httpClient } from "./http-client";

/**
 * Tag type definitions
 */
export interface TagResponse {
  message: string;
  data: TagsType[];
}

export interface SingleTagResponse {
  message: string;
  data: TagsType;
}

export interface UpdateTagInput {
  title: string;
}

/**
 * Tag Data Access Layer
 */
export const tagService = {
  /**
   * Get all tags for the current user
   */
  async getUserTags(userId: string): Promise<TagResponse> {
    return httpClient.get<TagResponse>(`api/tags/${userId}`);
  },

  /**
   * Create a new tag
   */
  async createTag(input: CreateTagInput): Promise<SingleTagResponse> {
    return httpClient.post<SingleTagResponse>(`api/tags`, input);
  },

  /**
   * Update an existing tag
   */
  async updateTag(
    tagId: number,
    input: UpdateTagInput,
  ): Promise<SingleTagResponse> {
    return httpClient.put<SingleTagResponse>(`api/tags/${tagId}`, input);
  },

  /**
   * Delete a tag (only if it has no bookmarks attached)
   */
  async deleteTag(tagId: number): Promise<{ message: string }> {
    return httpClient.delete<{ message: string }>(`api/tags/${tagId}`);
  },
};

import { BookmarkType, CreateBookmarkType } from "../zod/bookmark";
import { httpClient } from "./http-client";

/**
 * Bookmark type definitions
 */
export interface Bookmark {
  message: string;
  data: BookmarkType[];
}

export interface CreateBookmarkInput extends CreateBookmarkType {
  tags?: string[];
  userId: string;
}

export interface UpdateBookmarkInput {
  title?: string;
  url?: string;
  description?: string;
  tags?: string[];
  isPinned?: boolean;
  isArchived?: boolean;
}

/**
 * Bookmark Data Access Layer
 */
export const bookmarkService = {
  /**
   * Get all bookmarks for the current user
   */
  async getUserBookmarks(userId: string): Promise<Bookmark> {
    return httpClient.get<Bookmark>(`/bookmark/user/${userId}`);
  },

  /**
   * Get a single bookmark by ID
   */
  async getBookmarkById(bookmarkId: string): Promise<Bookmark> {
    return httpClient.get<Bookmark>(`/bookmark/${bookmarkId}`);
  },

  /**
   * Create a new bookmark
   */
  async createBookmark(data: CreateBookmarkInput): Promise<Bookmark> {
    return httpClient.post<Bookmark>("/bookmark", data);
  },

  /**
   * Update an existing bookmark
   */
  async updateBookmark(
    bookmarkId: string,
    data: UpdateBookmarkInput,
  ): Promise<Bookmark> {
    return httpClient.put<Bookmark>(`/bookmark/${bookmarkId}`, data);
  },

  /**
   * Delete a bookmark
   */
  async deleteBookmark(bookmarkId: string): Promise<void> {
    return httpClient.delete<void>(`/bookmark/${bookmarkId}`);
  },

  /**
   * Pin/unpin a bookmark
   */
  async togglePin(bookmarkId: string, isPinned: boolean): Promise<Bookmark> {
    return httpClient.patch<Bookmark>(`/bookmark/${bookmarkId}`, {
      isPinned,
    });
  },

  /**
   * Archive/unarchive a bookmark
   */
  async toggleArchive(
    bookmarkId: string,
    isArchived: boolean,
  ): Promise<Bookmark> {
    return httpClient.patch<Bookmark>(`/bookmark/${bookmarkId}`, {
      isArchived,
    });
  },

  /**
   * Increment view count and update last visited
   */
  async recordVisit(bookmarkId: string): Promise<Bookmark> {
    return httpClient.post<Bookmark>(`/bookmark/${bookmarkId}/visit`, {});
  },

  /**
   * Search bookmarks by title or tags
   */
  async searchBookmarks(userId: string, query: string): Promise<Bookmark[]> {
    return httpClient.get<Bookmark[]>(
      `/bookmark/user/${userId}/search?q=${encodeURIComponent(query)}`,
    );
  },

  /**
   * Filter bookmarks by tags
   */
  async filterByTags(userId: string, tags: string[]): Promise<Bookmark[]> {
    const tagsParam = tags
      .map((tag) => `tags=${encodeURIComponent(tag)}`)
      .join("&");
    return httpClient.get<Bookmark[]>(
      `/bookmark/user/${userId}/filter?${tagsParam}`,
    );
  },

  /**
   * Get pinned bookmarks
   */
  async getPinnedBookmarks(userId: string): Promise<Bookmark[]> {
    return httpClient.get<Bookmark[]>(`/bookmark/user/${userId}?pinned=true`);
  },

  /**
   * Get archived bookmarks
   */
  async getArchivedBookmarks(userId: string): Promise<Bookmark[]> {
    return httpClient.get<Bookmark[]>(`/bookmark/user/${userId}?archived=true`);
  },
};

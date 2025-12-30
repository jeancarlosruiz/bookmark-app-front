import { BookmarkType, CreateBookmarkType } from "../zod/bookmark";
import { httpClient } from "./http-client";

/**
 * Bookmark type definitions
 */

export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Bookmark {
  message: string;
  data: BookmarkType[];
  pagination: IPagination;
}

export interface UpdateBookmarkResponse {
  message: string;
  data: BookmarkType;
}

export interface CreateBookmarkInput extends CreateBookmarkType {
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
 * Query parameters for bookmark requests
 */
export interface BookmarkQueryParams {
  page?: string;
  limit?: string;
  sort?: string;
  tags?: string;
  search?: string;
}

/**
 * Bookmark Data Access Layer
 */
export const bookmarkService = {
  /**
   * Get all bookmarks for the current user
   */
  async getUserBookmarks(
    userId: string,
    params?: BookmarkQueryParams,
  ): Promise<Bookmark> {
    const queryParams = new URLSearchParams({
      page: params?.page || "1",
      limit: params?.limit || "10",
      ...(params?.sort && { sort: params.sort }),
    });

    return httpClient.get<Bookmark>(
      `/bookmark/user/${userId}?${queryParams.toString()}`,
    );
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
  async deleteBookmark(bookmarkId: number): Promise<void> {
    return httpClient.delete<void>(`/bookmark/${bookmarkId}`);
  },

  /**
   * Pin/unpin a bookmark
   */
  async togglePin(bookmarkId: number): Promise<UpdateBookmarkResponse> {
    return httpClient.put<UpdateBookmarkResponse>(
      `/bookmark/${bookmarkId}/toggle-pinned`,
    );
  },

  /**
   * Archive/unarchive a bookmark
   */
  async toggleArchive(bookmarkId: number): Promise<UpdateBookmarkResponse> {
    return httpClient.put<UpdateBookmarkResponse>(
      `/bookmark/${bookmarkId}/toggle-is-archived`,
    );
  },

  /**
   * Increment view count and update last visited
   */
  async recordVisit(bookmarkId: number): Promise<UpdateBookmarkResponse> {
    return httpClient.put<UpdateBookmarkResponse>(
      `/bookmark/view-count/${bookmarkId}`,
    );
  },

  /**
   * Search bookmarks by title or tags
   */
  async searchBookmarks(
    query: string,
    params?: BookmarkQueryParams,
  ): Promise<Bookmark> {
    const queryParams = new URLSearchParams({
      search: encodeURIComponent(query),
      ...(params?.page && { page: params.page }),
      ...(params?.limit && { limit: params.limit }),
      ...(params?.sort && { sort: params.sort }),
    });

    return httpClient.get<Bookmark>(
      `/bookmark/title?${queryParams.toString()}`,
    );
  },

  /**
   * Filter bookmarks by tags
   */
  async filterByTags(
    tags: string,
    params?: BookmarkQueryParams,
  ): Promise<Bookmark> {
    const queryParams = new URLSearchParams({
      q: tags,
      ...(params?.page && { page: params.page }),
      ...(params?.limit && { limit: params.limit }),
      ...(params?.sort && { sort: params.sort }),
    });

    return httpClient.get<Bookmark>(`/bookmark/tags?${queryParams.toString()}`);
  },

  /**
   * Get pinned bookmarks
   */
  async getPinnedBookmarks(
    userId: string,
    params?: BookmarkQueryParams,
  ): Promise<Bookmark> {
    const queryParams = new URLSearchParams({
      pinned: "true",
      ...(params?.page && { page: params.page }),
      ...(params?.limit && { limit: params.limit }),
      ...(params?.sort && { sort: params.sort }),
    });

    return httpClient.get<Bookmark>(
      `/bookmark/user/${userId}?${queryParams.toString()}`,
    );
  },

  /**
   * Get archived bookmarks
   */
  async getArchivedBookmarks(
    userId: string,
    params?: BookmarkQueryParams,
  ): Promise<Bookmark> {
    const queryParams = new URLSearchParams({
      ...(params?.page && { page: params.page }),
      ...(params?.limit && { limit: params.limit }),
      ...(params?.sort && { sort: params.sort }),
    });

    const queryString = queryParams.toString();
    const url = `/bookmark/user/${userId}/archived${queryString ? `?${queryString}` : ""}`;

    return httpClient.get<Bookmark>(url);
  },
};

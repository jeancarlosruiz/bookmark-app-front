import { BookmarkType, CreateBookmarkType } from "../zod/bookmark";
import { parseAsString, createSerializer } from "nuqs/server";
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

export interface MetadataPreviewData {
  title: string;
  description: string;
  favicon: string;
}

export interface MetadataPreviewResponse {
  message: string;
  data: MetadataPreviewData;
}

export interface CreateBookmarkInput extends CreateBookmarkType {
  user_id: string;
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
  page: string;
  limit: string;
  sort: string;
  q: string;
  search: string;
}

const searchParamsParsed = {
  search: parseAsString,
  page: parseAsString,
  limit: parseAsString,
  sort: parseAsString,
  q: parseAsString,
};

const searchParams = createSerializer(searchParamsParsed);

// Serializer para URL metadata preview (nuqs maneja encoding automaticamente)
const urlSerializer = createSerializer({ url: parseAsString });

/**
 * Bookmark Data Access Layer
 */
export const bookmarkService = {
  /**
   * Get all bookmarks for the current user
   */
  async getUserBookmarks(
    userId: string,
    params: BookmarkQueryParams,
  ): Promise<Bookmark> {
    return httpClient.get<Bookmark>(
      `api/bookmark/user/${userId}${searchParams(params)}`,
    );
  },

  /**
   * Create a new bookmark
   */
  async createBookmark(data: CreateBookmarkInput): Promise<Bookmark> {
    return httpClient.post<Bookmark>("api/bookmark", data);
  },

  /**
   * Update an existing bookmark
   */
  async updateBookmark(
    bookmarkId: string,
    data: UpdateBookmarkInput,
  ): Promise<Bookmark> {
    return httpClient.put<Bookmark>(`api/bookmark/update/${bookmarkId}`, data);
  },

  /**
   * Delete a bookmark
   */
  async deleteBookmark(bookmarkId: number): Promise<void> {
    return httpClient.delete<void>(`api/bookmark/${bookmarkId}`);
  },

  /**
   * Pin/unpin a bookmark
   */
  async togglePin(bookmarkId: number): Promise<UpdateBookmarkResponse> {
    return httpClient.put<UpdateBookmarkResponse>(
      `api/bookmark/${bookmarkId}/toggle-pinned`,
    );
  },

  /**
   * Archive/unarchive a bookmark
   */
  async toggleArchive(bookmarkId: number): Promise<UpdateBookmarkResponse> {
    return httpClient.put<UpdateBookmarkResponse>(
      `api/bookmark/${bookmarkId}/toggle-is-archived`,
    );
  },

  /**
   * Increment view count and update last visited
   */
  async recordVisit(bookmarkId: number): Promise<UpdateBookmarkResponse> {
    return httpClient.put<UpdateBookmarkResponse>(
      `api/bookmark/view-count/${bookmarkId}`,
    );
  },

  /**
   * Search bookmarks by title
   */
  async searchBookmarks(params: BookmarkQueryParams): Promise<Bookmark> {
    return httpClient.get<Bookmark>(
      `api/bookmark/title${searchParams(params)}`,
    );
  },

  /**
   * Filter bookmarks by tags
   */
  async filterByTags(params: BookmarkQueryParams): Promise<Bookmark> {
    return httpClient.get<Bookmark>(`api/bookmark/tags${searchParams(params)}`);
  },

  /**
   * Get archived bookmarks
   */
  async getArchivedBookmarks(
    userId: string,
    params: BookmarkQueryParams,
  ): Promise<Bookmark> {
    const url = `api/bookmark/user/${userId}/archived${searchParams(params)}`;

    return httpClient.get<Bookmark>(url);
  },

  /**
   * Get url Metadata
   */
  async getMetadata(url: string): Promise<MetadataPreviewResponse> {
    return httpClient.get<MetadataPreviewResponse>(
      `api/bookmark/preview${urlSerializer({ url })}`,
    );
  },
};

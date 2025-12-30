"use server";

import { revalidatePath } from "next/cache";
import { authService } from "@/lib/dal/auth";
import { BookmarkQueryParams, bookmarkService } from "@/lib/dal/bookmark";
import { HTTPError } from "@/lib/dal/http-client";

/**
 * Get all bookmarks for the current user
 */

export const getBookmarksAction = async (params: BookmarkQueryParams) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      throw new Error("User not authenticated");
    }

    const userId = userData.user.id;
    let bookmarks;

    // Change this, it doesnt make sense.
    if (params.q) {
      bookmarks = await bookmarkService.filterByTags(params);
    } else if (params.search) {
      bookmarks = await bookmarkService.searchBookmarks(params);
    } else {
      bookmarks = await bookmarkService.getUserBookmarks(userId, params);
    }

    return {
      success: true,
      data: bookmarks.data,
      pagination: bookmarks.pagination,
    };
  } catch (error) {
    // Handle HTTP errors with detailed information
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });

      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    // Handle other errors
    console.error("Error fetching bookmarks:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const incrementCount = async (id: number) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      throw new Error("User not authenticated");
    }

    const result = await bookmarkService.recordVisit(id);

    // Revalidate paths to refresh bookmark lists
    revalidatePath("/");
    revalidatePath("/archived");

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // Handle HTTP errors with detailed information
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });

      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    // Handle other errors
    console.error("Error fetching bookmarks:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Pin/ Unpin bookmark
 */

export const togglePinned = async (id: number) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      throw new Error("User not authenticated");
    }

    const result = await bookmarkService.togglePin(id);

    // Revalidate paths to refresh bookmark lists
    revalidatePath("/");
    revalidatePath("/archived");

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // Handle HTTP errors with detailed information
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });

      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    // Handle other errors
    console.error("Error fetching bookmarks:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Archive/ Unarchive bookmark
 */

export const toggleArchived = async (id: number) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      throw new Error("User not authenticated");
    }

    const result = await bookmarkService.toggleArchive(id);

    // Revalidate paths to refresh bookmark lists
    revalidatePath("/");
    revalidatePath("/archived");

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    // Handle HTTP errors with detailed information
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });

      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    // Handle other errors
    console.error("Error fetching bookmarks:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Soft delete bookmark
 */

export const deleteBookmark = async (id: number) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      throw new Error("User not authenticated");
    }

    await bookmarkService.deleteBookmark(id);

    // Revalidate paths to refresh bookmark lists
    revalidatePath("/");
    revalidatePath("/archived");

    return {
      success: true,
    };
  } catch (error) {
    // Handle HTTP errors with detailed information
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });

      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    // Handle other errors
    console.error("Error fetching bookmarks:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export interface CREATE_BOOKMARK_STATE {
  status: "idle" | "pending" | "success" | "error";
  errors?: Record<string, string> | null;
  fields?: {
    title: string;
    description: string;
    url: string;
    tags: string;
  };
}

export const createBookmarkAction = async (
  _: CREATE_BOOKMARK_STATE,
  formData: FormData,
): Promise<CREATE_BOOKMARK_STATE> => {
  try {
    return {
      status: "success",
      errors: null,
    };
  } catch (error) {
    return {
      status: "success",
      errors: null,
    };
  }
};

export interface UPDATE_BOOKMARK_STATE {
  status: "idle" | "pending" | "success" | "error";
  errors?: Record<string, string> | null;
  fields?: {
    title: string;
    description: string;
    url: string;
    tags: string;
  };
}

export const updateBookmarkAction = async (
  _: UPDATE_BOOKMARK_STATE,
  formData: FormData,
): Promise<UPDATE_BOOKMARK_STATE> => {
  try {
    return {
      status: "success",
      errors: null,
    };
  } catch (error) {
    return {
      status: "success",
      errors: null,
    };
  }
};

/**
 * Get all archived bookmarks for the current user
 */
export const getArchivedBookmarksAction = async (
  params: BookmarkQueryParams,
) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      throw new Error("User not authenticated");
    }

    const userId = userData.user.id;
    const bookmarks = await bookmarkService.getArchivedBookmarks(
      userId,
      params,
    );

    return {
      success: true,
      data: bookmarks.data,
      pagination: bookmarks.pagination,
    };
  } catch (error) {
    // Handle HTTP errors with detailed information
    if (error instanceof HTTPError) {
      console.error("HTTP Error:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url,
        message: error.message,
      });

      return {
        success: false,
        error: error.message,
        status: error.status,
      };
    }

    // Handle other errors
    console.error("Error fetching bookmarks:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

"use server";

import { authService } from "@/lib/dal/auth";
import { bookmarkService } from "@/lib/dal/bookmark";
import { HTTPError } from "@/lib/dal/http-client";

/**
 * Get all bookmarks for the current user
 */
export const getBookmarksAction = async () => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      throw new Error("User not authenticated");
    }

    const userId = userData.user.id;
    const bookmarks = await bookmarkService.getUserBookmarks(userId);

    return {
      success: true,
      data: bookmarks,
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

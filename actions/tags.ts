"use server";

import { authService } from "@/lib/dal/auth";
import { tagService } from "@/lib/dal/tags";
import { HTTPError } from "@/lib/dal/http-client";

/**
 * Get all tags for the current user
 */
export const getTagsAction = async () => {
  try {
    const userData = await authService.getCurrentUser();

    // Validate user is authenticated before proceeding
    if (!userData?.user?.id) {
      return {
        success: false,
        error: "User not authenticated",
        data: [],
      };
    }

    const { data } = await tagService.getUserTags(userData.user.id);

    return {
      success: true,
      data,
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
    console.error("Error fetching tags:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

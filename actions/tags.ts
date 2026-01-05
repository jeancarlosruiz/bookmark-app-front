"use server";

import { revalidatePath } from "next/cache";
import { authService } from "@/lib/dal/auth";
import { tagService } from "@/lib/dal/tags";
import { HTTPError } from "@/lib/dal/http-client";
import { CREATE_TAG_SCHEMA } from "@/lib/zod/tag";
import { zodFlattenError } from "@/lib/zod/utils";

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

/**
 * Create a new tag
 */

export interface CREATE_TAG_STATE {
  status: "idle" | "success" | "error";
  errors?: Record<string, string> | null;
  serverError?: string;
  fields?: {
    title: string;
  };
}

export const createTagAction = async (
  prev: CREATE_TAG_STATE,
  formData: FormData,
): Promise<CREATE_TAG_STATE> => {
  const userData = await authService.getCurrentUser();

  if (!userData?.user?.id) {
    return {
      status: "error",
      errors: { message: "User not authenticated" },
    };
  }
  const rawData = {
    title: formData.get("title") as string,
  };

  try {
    const result = await CREATE_TAG_SCHEMA.safeParseAsync(rawData);

    if (!result.success) {
      console.log("Hubo un error");
      const flattenedErrors = zodFlattenError(result.error);

      return {
        status: "error",
        errors: {
          title: flattenedErrors.fieldErrors.title?.[0] || "",
        },
        fields: rawData,
      };
    }
    await tagService.createTag({ title: result.data.title });

    revalidatePath("/");

    return {
      status: "success",
    };
  } catch (error) {
    console.error("ERROR in createTagAction:", error);

    if (error instanceof HTTPError) {
      return {
        status: "error",
        errors: null,
        serverError: error.message,
        fields: rawData,
      };
    }

    return {
      status: "error",
      errors: null,
      serverError:
        error instanceof Error ? error.message : "An unexpected error occurred",
      fields: rawData,
    };
  }
};

/**
 * Update an existing tag
 */
export const updateTagAction = async (tagId: number, title: string) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    const { data } = await tagService.updateTag(tagId, {
      title,
    });

    revalidatePath("/");

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      console.error("HTTP Error updating tag:", {
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

    console.error("Error updating tag:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Delete a tag (only if it has no bookmarks attached)
 */
export const deleteTagAction = async (tagId: number) => {
  try {
    const userData = await authService.getCurrentUser();

    if (!userData?.user?.id) {
      return {
        success: false,
        error: "User not authenticated",
      };
    }

    await tagService.deleteTag(tagId);

    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      console.error("HTTP Error deleting tag:", {
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

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

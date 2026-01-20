"use client";

import DialogContainer from "../molecules/dialog-container";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Textarea } from "../atoms/textarea";
import { useActionState, useEffect, useReducer } from "react";
import {
  UPDATE_BOOKMARK_STATE,
  updateBookmarkAction,
  getMetadata,
  ScrapedMetadata,
} from "@/actions/bookmarks";
import { BookmarkType } from "@/lib/zod/bookmark";
import { toast } from "sonner";
import TagInput from "./tag-input";

// Ideas:
// Si se cambia la url al editar advertir que el conteo de visitas sera reseado a 0

interface EditBookmarkFormProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  bookmark: BookmarkType;
}

type MetadataStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ScrapedMetadata }
  | { status: "error"; message: string };

interface FormFields {
  title: string;
  description: string;
  url: string;
  tags: string;
  favicon: string;
}

interface BookmarkFormState {
  metadata: MetadataStatus;
  fields: FormFields;
  userEdited: { title: boolean; description: boolean };
  lastFetchedUrl: string;
  urlToFetch: string; // Only updates on blur, triggers fetch
}

type BookmarkFormAction =
  | { type: "URL_BLUR"; url: string }
  | { type: "METADATA_FETCH_STARTED" }
  | { type: "METADATA_FETCH_SUCCEEDED"; data: ScrapedMetadata }
  | { type: "METADATA_FETCH_FAILED"; message: string }
  | { type: "FIELD_CHANGED"; field: keyof FormFields; value: string };

// ============================================
// Reducer function
// ============================================

function bookmarkFormReducer(
  state: BookmarkFormState,
  action: BookmarkFormAction,
): BookmarkFormState {
  switch (action.type) {
    case "URL_BLUR":
      return {
        ...state,
        fields: { ...state.fields, url: action.url },
        urlToFetch: action.url, // This triggers the fetch useEffect
      };

    case "METADATA_FETCH_STARTED":
      return {
        ...state,
        metadata: { status: "loading" },
        lastFetchedUrl: state.urlToFetch,
      };

    case "METADATA_FETCH_SUCCEEDED":
      return {
        ...state,
        metadata: { status: "success", data: action.data },
        fields: {
          ...state.fields,
          // Only auto-fill if user has NOT manually edited
          title: state.userEdited.title
            ? state.fields.title
            : action.data.title,
          description: state.userEdited.description
            ? state.fields.description
            : action.data.description,
          favicon: action.data.favicon, // Always update favicon
        },
      };

    case "METADATA_FETCH_FAILED":
      return {
        ...state,
        metadata: { status: "error", message: action.message },
      };

    case "FIELD_CHANGED": {
      const newState = {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
      };
      // Mark as user-edited if title or description

      if (action.field === "title" || action.field === "description") {
        newState.userEdited = {
          ...state.userEdited,
          [action.field]: action.value !== "",
        };
      }

      return newState;
    }

    default:
      return state;
  }
}

const FormContent = ({
  setDialogOpen,
  bookmark,
  tagsStr,
}: {
  setDialogOpen: (open: boolean) => void;
  tagsStr: string;
  bookmark: BookmarkType;
}) => {
  // Initial form state from existing bookmark
  const initialFormState: BookmarkFormState = {
    metadata: { status: "idle" },
    fields: {
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
      tags: tagsStr,
      favicon: bookmark.favicon || "",
    },
    userEdited: { title: false, description: false },
    lastFetchedUrl: bookmark.url, // Don't refetch on mount
    urlToFetch: "",
  };

  // useReducer for metadata and form field state
  const [formState, dispatch] = useReducer(
    bookmarkFormReducer,
    initialFormState,
  );

  // Initial action state
  const initialActionState: UPDATE_BOOKMARK_STATE = {
    status: "idle",
    errors: null,
    fields: {
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
      tags: tagsStr,
    },
  };

  const handleAction = async (
    prevState: UPDATE_BOOKMARK_STATE,
    formData: FormData,
  ): Promise<UPDATE_BOOKMARK_STATE> => {
    const result = await updateBookmarkAction(prevState, formData);

    // Handle success/error here instead of useEffect
    if (result.status === "success") {
      toast.success("Bookmark updated successfully.");
      setDialogOpen(false);
    } else if (result.status === "error" && result.serverError) {
      toast.error(result.serverError);
    }

    return result;
  };

  // useActionState for form submission and validation
  const [actionState, formAction, isPending] = useActionState(
    handleAction,
    initialActionState,
  );

  // Effect: fetch metadata only when URL blur occurs (not on every keystroke)
  useEffect(() => {
    const { urlToFetch, lastFetchedUrl, metadata } = formState;
    const shouldFetch =
      urlToFetch &&
      urlToFetch !== lastFetchedUrl &&
      urlToFetch.startsWith("http") &&
      metadata.status !== "loading";

    if (!shouldFetch) return;

    dispatch({ type: "METADATA_FETCH_STARTED" });

    getMetadata(urlToFetch).then((result) => {
      if (result.success && result.data) {
        dispatch({ type: "METADATA_FETCH_SUCCEEDED", data: result.data });
      } else {
        dispatch({
          type: "METADATA_FETCH_FAILED",
          message: result.error || "Failed to fetch metadata",
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formState.urlToFetch,
    formState.lastFetchedUrl,
    formState.metadata.status,
  ]);

  // Handler for field changes
  const handleFieldChange =
    (field: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: "FIELD_CHANGED", field, value: e.target.value });
    };

  // Handler for URL blur - triggers the URL_BLUR action
  const handleUrlBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: "URL_BLUR", url: e.target.value });
  };

  const isLoadingMetadata = formState.metadata.status === "loading";

  return (
    <form action={formAction} className="flex flex-col gap-[20px] w-full">
      {/* Hidden fields */}
      <input type="hidden" name="bookmarkId" value={bookmark.id} />
      {formState.fields.favicon && (
        <input type="hidden" name="favicon" value={formState.fields.favicon} />
      )}

      {/* Title - controlled */}
      <Input
        label="Title"
        name="title"
        value={formState.fields.title}
        onChange={handleFieldChange("title")}
        error={actionState.status === "error" && !!actionState.errors?.title}
        hintText={actionState.errors?.title}
        placeholder={isLoadingMetadata ? "Loading..." : undefined}
      />

      {/* Description - controlled */}
      <Textarea
        label="Description"
        name="description"
        value={formState.fields.description}
        onChange={handleFieldChange("description")}
        maxLength={280}
        showCharCount
        className="h-[140px]"
        placeholder={isLoadingMetadata ? "Loading..." : undefined}
      />

      {/* Website URL - controlled with onBlur trigger */}
      <Input
        label="Website URL"
        name="url"
        type="url"
        value={formState.fields.url}
        onChange={handleFieldChange("url")}
        onBlur={handleUrlBlur}
        error={
          (actionState.status === "error" && !!actionState.errors?.url) ||
          formState.metadata.status === "error"
        }
        hintText={
          (actionState.errors?.url && actionState.errors?.url) ||
          (formState.metadata.status === "error"
            ? formState.metadata.message
            : undefined)
        }
      />

      {/* Tags - controlled */}
      <TagInput
        value={formState.fields.tags}
        onChange={handleFieldChange("tags")}
        error={actionState.status === "error" && !!actionState.errors?.tags}
        hintText={actionState.errors?.tags}
      />

      {/* Buttons */}
      <div className="flex gap-[var(--spacing-200,16px)] items-center justify-end w-full">
        <Button
          type="button"
          hierarchy="secondary"
          size="md"
          disabled={isPending || isLoadingMetadata}
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          hierarchy="primary"
          size="md"
          disabled={isPending || isLoadingMetadata}
        >
          {isPending ? "Updating..." : "Edit Bookmark"}
        </Button>
      </div>
    </form>
  );
};

const EditBookmarkForm = ({
  dialogOpen,
  setDialogOpen,
  bookmark,
}: EditBookmarkFormProps) => {
  const tagsStr = bookmark.tags.map((t) => t.title).join(",");
  return (
    <DialogContainer
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      customCloseBtn={true}
      title="Edit bookmark"
      description="Update your saved link details — change the title, description, URL, or tags anytime."
    >
      <FormContent
        tagsStr={tagsStr}
        setDialogOpen={setDialogOpen}
        bookmark={bookmark}
      />
    </DialogContainer>
  );
};

export default EditBookmarkForm;

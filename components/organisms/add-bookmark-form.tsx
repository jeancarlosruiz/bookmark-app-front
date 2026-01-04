"use client";

import DialogContainer from "../molecules/dialog-container";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Textarea } from "../atoms/textarea";
import { useActionState, useEffect, useReducer } from "react";
import {
  CREATE_BOOKMARK_STATE,
  createBookmarkAction,
  getMetadata,
  ScrapedMetadata,
} from "@/actions/bookmarks";
import { toast } from "sonner";
import TagInput from "./tag-input";

interface AddBookmarkFormProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

// ============================================
// Types for useReducer (discriminated unions)
// ============================================

type MetadataStatus =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: ScrapedMetadata }
  | { status: "error" };

interface FormFields {
  title: string;
  description: string;
  url: string;
  tags: string;
}

interface BookmarkFormState {
  metadata: MetadataStatus;
  fields: FormFields;
  userEdited: { title: boolean; description: boolean };
  lastFetchedUrl: string;
}

type BookmarkFormAction =
  | { type: "URL_BLUR"; url: string }
  | { type: "METADATA_FETCH_STARTED" }
  | { type: "METADATA_FETCH_SUCCEEDED"; data: ScrapedMetadata }
  | { type: "METADATA_FETCH_FAILED" }
  | { type: "FIELD_CHANGED"; field: keyof FormFields; value: string }
  | { type: "FORM_RESET" };

// ============================================
// Reducer function
// ============================================

const initialFormState: BookmarkFormState = {
  metadata: { status: "idle" },
  fields: { title: "", description: "", url: "", tags: "" },
  userEdited: { title: false, description: false },
  lastFetchedUrl: "",
};

function bookmarkFormReducer(
  state: BookmarkFormState,
  action: BookmarkFormAction,
): BookmarkFormState {
  switch (action.type) {
    case "URL_BLUR":
      return { ...state, fields: { ...state.fields, url: action.url } };

    case "METADATA_FETCH_STARTED":
      return {
        ...state,
        metadata: { status: "loading" },
        lastFetchedUrl: state.fields.url,
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
        },
      };

    case "METADATA_FETCH_FAILED":
      return { ...state, metadata: { status: "error" } };

    case "FIELD_CHANGED": {
      const newState = {
        ...state,
        fields: { ...state.fields, [action.field]: action.value },
      };
      // Mark as user-edited if title or description
      if (action.field === "title" || action.field === "description") {
        newState.userEdited = { ...state.userEdited, [action.field]: true };
      }
      return newState;
    }

    case "FORM_RESET":
      return initialFormState;

    default:
      return state;
  }
}

// ============================================
// Initial state for useActionState
// ============================================

const initialActionState: CREATE_BOOKMARK_STATE = {
  status: "idle",
  errors: null,
  fields: {
    title: "",
    description: "",
    url: "",
    tags: "",
  },
};

// ============================================
// FormContent Component
// ============================================

const FormContent = ({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) => {
  // useReducer for metadata and form field state
  const [formState, dispatch] = useReducer(
    bookmarkFormReducer,
    initialFormState,
  );

  // useActionState for form submission and validation
  const [actionState, formAction, isPending] = useActionState(
    createBookmarkAction,
    initialActionState,
  );

  // Effect: success toast and reset
  useEffect(() => {
    if (actionState.status === "success") {
      toast.success("Bookmark added successfully.");
      dispatch({ type: "FORM_RESET" });
      setDialogOpen(false);
    }
  }, [actionState.status, setDialogOpen]);

  // Effect: fetch metadata when URL changes (triggered by URL_BLUR)
  useEffect(() => {
    const { url } = formState.fields;
    const shouldFetch =
      url &&
      url !== formState.lastFetchedUrl &&
      url.startsWith("http") &&
      formState.metadata.status !== "loading";

    if (!shouldFetch) return;

    dispatch({ type: "METADATA_FETCH_STARTED" });

    getMetadata(url).then((result) => {
      if (result.success && result.data) {
        dispatch({ type: "METADATA_FETCH_SUCCEEDED", data: result.data });
      } else {
        dispatch({ type: "METADATA_FETCH_FAILED" });
      }
    });
  }, [
    formState.fields.url,
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
      {/* Hidden favicon */}
      {formState.metadata.status === "success" && (
        <input
          type="hidden"
          name="favicon"
          value={formState.metadata.data.favicon}
        />
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
        error={actionState.status === "error" && !!actionState.errors?.url}
        hintText={actionState.errors?.url}
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
          onClick={() => setDialogOpen(false)}
        >
          Cancel
        </Button>
        <Button
          disabled={isPending || isLoadingMetadata}
          type="submit"
          hierarchy="primary"
          size="md"
        >
          {isPending ? "Adding..." : "Add Bookmark"}
        </Button>
      </div>
    </form>
  );
};

// ============================================
// Main Component
// ============================================

const AddBookmarkForm = ({
  dialogOpen,
  setDialogOpen,
}: AddBookmarkFormProps) => {
  return (
    <DialogContainer
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      customCloseBtn={true}
      title="Add a bookmark"
      description="Save a link with details to keep your collection organized. We extract the favicon automatically from the URL."
    >
      <FormContent setDialogOpen={setDialogOpen} />
    </DialogContainer>
  );
};

export default AddBookmarkForm;

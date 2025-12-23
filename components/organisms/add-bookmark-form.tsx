"use client";

import DialogContainer from "../molecules/dialog-container";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Textarea } from "../atoms/textarea";
import { useActionState, useEffect } from "react";
import {
  CREATE_BOOKMARK_STATE,
  createBookmarkAction,
} from "@/actions/bookmarks";
import { toast } from "sonner";

interface AddBookmarkFormProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const initialState: CREATE_BOOKMARK_STATE = {
  status: "idle",
  errors: null,
  fields: {
    title: "",
    description: "",
    url: "",
    tags: "",
  },
};

const AddBookmarkForm = ({
  dialogOpen,
  setDialogOpen,
}: AddBookmarkFormProps) => {
  const [state, formAction, isPending] = useActionState(
    createBookmarkAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Bookmark added successfully.");
      setDialogOpen(false);
    }
  }, [state]);

  return (
    <DialogContainer
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      customCloseBtn={true}
      title="Add a bookmark"
      description="Save a link with details to keep your collection organized. We extract the favicon automatically from the URL."
    >
      <form action={formAction} className="flex flex-col gap-[20px] w-full">
        {/* Title */}
        <Input label="Title" name="title" defaultValue={state.fields?.title} />

        {/* Description */}
        <Textarea
          label="Description"
          name="description"
          defaultValue={state.fields?.description}
          maxLength={280}
          showCharCount
          className="h-[140px]"
        />

        {/* Website URL */}
        <Input
          label="Website URL"
          name="url"
          type="url"
          defaultValue={state.fields?.url}
        />

        {/* Tags */}
        <Input
          label="Tags"
          name="tags"
          defaultValue={state.fields?.tags}
          placeholder="e.g. Design, Learning, Tools"
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
            disabled={isPending}
            type="submit"
            hierarchy="primary"
            size="md"
          >
            Add Bookmark
          </Button>
        </div>
      </form>
    </DialogContainer>
  );
};

export default AddBookmarkForm;

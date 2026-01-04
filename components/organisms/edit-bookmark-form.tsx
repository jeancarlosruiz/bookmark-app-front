"use client";

import DialogContainer from "../molecules/dialog-container";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Textarea } from "../atoms/textarea";
import { useActionState, useEffect } from "react";
import {
  UPDATE_BOOKMARK_STATE,
  updateBookmarkAction,
} from "@/actions/bookmarks";
import { BookmarkType } from "@/lib/zod/bookmark";
import { toast } from "sonner";

interface EditBookmarkFormProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  bookmark: BookmarkType;
}

const EditBookmarkForm = ({
  dialogOpen,
  setDialogOpen,
  bookmark,
}: EditBookmarkFormProps) => {
  const tagsStr = bookmark.tags.map((t) => t.title).join(",");
  const initialState: UPDATE_BOOKMARK_STATE = {
    status: "idle",
    errors: null,
    fields: {
      title: bookmark.title,
      description: bookmark.description,
      url: bookmark.url,
      tags: tagsStr,
    },
  };

  const [state, formAction, isPending] = useActionState(
    updateBookmarkAction,
    initialState,
  );

  useEffect(() => {
    if (state.status === "success") {
      toast.success("Bookmark updated successfully.");
      setDialogOpen(false);
    }
  }, [state]);

  return (
    <DialogContainer
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      customCloseBtn={true}
      title="Edit bookmark"
      description="Update your saved link details — change the title, description, URL, or tags anytime."
    >
      <form action={formAction} className="flex flex-col gap-[20px] w-full">
        {bookmark.favicon && (
          <input type="hidden" name="favicon" value={bookmark.favicon} />
        )}
        <input type="hidden" name="bookmarkId" value={bookmark.id} />
        {/* Title */}
        <Input label="Title" name="title" defaultValue={state.fields?.title} />

        {/* Description */}
        <Textarea
          label="Description"
          maxLength={280}
          showCharCount
          className="h-[140px]"
          name="description"
          defaultValue={state.fields?.description}
        />

        {/* Website URL */}
        <Input
          label="Website URL"
          type="url"
          name="url"
          defaultValue={state.fields?.url}
        />

        {/* Tags */}
        <Input
          label="Tags"
          placeholder="e.g. Design, Learning, Tools"
          name="tags"
          defaultValue={state.fields?.tags}
        />

        {/* Buttons */}
        <div className="flex gap-[var(--spacing-200,16px)] items-center justify-end w-full">
          <Button
            type="button"
            hierarchy="secondary"
            size="md"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            hierarchy="primary"
            size="md"
            disabled={isPending}
          >
            Edit Bookmark
          </Button>
        </div>
      </form>
    </DialogContainer>
  );
};

export default EditBookmarkForm;

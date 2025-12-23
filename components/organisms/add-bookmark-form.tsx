"use client";

import DialogContainer from "../molecules/dialog-container";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Textarea } from "../atoms/textarea";

interface AddBookmarkFormProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

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
      <form className="flex flex-col gap-[20px] w-full">
        {/* Title */}
        <Input label="Title" required placeholder="" />

        {/* Description */}
        <Textarea
          label="Description"
          required
          maxLength={280}
          showCharCount
          className="h-[140px]"
          placeholder=""
        />

        {/* Website URL */}
        <Input label="Website URL" required type="url" placeholder="" />

        {/* Tags */}
        <Input
          label="Tags"
          required
          placeholder="e.g. Design, Learning, Tools"
        />

        {/* Buttons */}
        <div className="flex gap-[var(--spacing-200,16px)] items-center justify-end w-full">
          <Button type="button" hierarchy="secondary" size="md">
            Cancel
          </Button>
          <Button type="submit" hierarchy="primary" size="md">
            Add Bookmark
          </Button>
        </div>
      </form>
    </DialogContainer>
  );
};

export default AddBookmarkForm;

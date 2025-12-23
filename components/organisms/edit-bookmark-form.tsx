"use client";

import DialogContainer from "../molecules/dialog-container";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Textarea } from "../atoms/textarea";

interface EditBookmarkFormProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
}

const EditBookmarkForm = ({
  dialogOpen,
  setDialogOpen,
}: EditBookmarkFormProps) => {
  return (
    <DialogContainer
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      customCloseBtn={true}
      title="Edit bookmark"
      description="Update your saved link details — change the title, description, URL, or tags anytime."
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
            Edit Bookmark
          </Button>
        </div>
      </form>
    </DialogContainer>
  );
};

export default EditBookmarkForm;

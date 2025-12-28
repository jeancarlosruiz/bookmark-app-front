"use client";

import * as React from "react";
import { Button } from "@/components/atoms/button";
import {
  BookmarkArchiveDialog,
  BookmarkUnarchiveDialog,
  BookmarkDeleteDialog,
} from "./bookmark-confirmation-dialogs";

/**
 * Example usage of the bookmark confirmation dialogs
 * This file demonstrates how to use the confirmation dialogs in your components
 */
export function BookmarkConfirmationDialogsExample() {
  const [archiveOpen, setArchiveOpen] = React.useState(false);
  const [unarchiveOpen, setUnarchiveOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleArchive = async () => {
    // Call your archive bookmark server action here
    console.log("Archiving bookmark...");
    // await archiveBookmarkAction(bookmarkId);
    setArchiveOpen(false);
  };

  const handleUnarchive = async () => {
    // Call your unarchive bookmark server action here
    console.log("Unarchiving bookmark...");
    // await unarchiveBookmarkAction(bookmarkId);
    setUnarchiveOpen(false);
  };

  const handleDelete = async () => {
    // Call your delete bookmark server action here
    console.log("Deleting bookmark...");
    // await deleteBookmarkAction(bookmarkId);
    setDeleteOpen(false);
  };

  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-2xl font-bold">Bookmark Confirmation Dialogs</h1>
      <p className="text-sm text-muted-foreground">
        Click the buttons below to see the confirmation dialogs
      </p>

      <div className="flex gap-4">
        <Button onClick={() => setArchiveOpen(true)}>
          Test Archive Dialog
        </Button>
        <Button onClick={() => setUnarchiveOpen(true)}>
          Test Unarchive Dialog
        </Button>
        <Button onClick={() => setDeleteOpen(true)}>Test Delete Dialog</Button>
      </div>

      {/* Archive Dialog */}
      <BookmarkArchiveDialog
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        onConfirm={handleArchive}
      />

      {/* Unarchive Dialog */}
      <BookmarkUnarchiveDialog
        open={unarchiveOpen}
        onOpenChange={setUnarchiveOpen}
        onConfirm={handleUnarchive}
      />

      {/* Delete Dialog */}
      <BookmarkDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}

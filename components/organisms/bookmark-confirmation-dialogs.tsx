"use client";

import * as React from "react";
import {
  ConfirmationDialog,
  type ConfirmationDialogProps,
} from "@/components/molecules/confirmation-dialog";

/**
 * Archive Bookmark Confirmation Dialog
 * Asks the user to confirm archiving a bookmark
 */
export interface BookmarkArchiveDialogProps
  extends Omit<
    ConfirmationDialogProps,
    "title" | "description" | "confirmText" | "variant"
  > {}

export function BookmarkArchiveDialog(props: BookmarkArchiveDialogProps) {
  return (
    <ConfirmationDialog
      title="Archive bookmark"
      description="Are you sure you want to archive this bookmark?"
      confirmText="Archive"
      variant="default"
      {...props}
    />
  );
}

/**
 * Unarchive Bookmark Confirmation Dialog
 * Asks the user to confirm unarchiving a bookmark
 */
export interface BookmarkUnarchiveDialogProps
  extends Omit<
    ConfirmationDialogProps,
    "title" | "description" | "confirmText" | "variant"
  > {}

export function BookmarkUnarchiveDialog(props: BookmarkUnarchiveDialogProps) {
  return (
    <ConfirmationDialog
      title="Unarchive bookmark"
      description="Move this bookmark back to your active list?"
      confirmText="Unarchive"
      variant="default"
      {...props}
    />
  );
}

/**
 * Delete Bookmark Confirmation Dialog
 * Asks the user to confirm permanently deleting a bookmark
 */
export interface BookmarkDeleteDialogProps
  extends Omit<
    ConfirmationDialogProps,
    "title" | "description" | "confirmText" | "variant"
  > {}

export function BookmarkDeleteDialog(props: BookmarkDeleteDialogProps) {
  return (
    <ConfirmationDialog
      title="Delete bookmark"
      description="Are you sure you want to delete this bookmark?"
      confirmText="Delete permanently"
      variant="destructive"
      {...props}
    />
  );
}

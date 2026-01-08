"use client";

import { useEffect } from "react";
import { toast } from "sonner";

interface MigrationData {
  bookmarks_migrated: number;
  bookmarks_merged: number;
  tags_migrated: number;
  tags_merged: number;
}

/**
 * Component that checks for migration data cookie and displays a success toast
 * when an anonymous user links their account. Automatically deletes the cookie
 * after displaying the notification.
 */
export function MigrationToast() {
  useEffect(() => {
    // Check for migration_data cookie
    const cookies = document.cookie.split("; ");
    const migrationCookie = cookies.find((c) =>
      c.startsWith("migration_data=")
    );

    if (!migrationCookie) return;

    try {
      // Parse the migration data
      const cookieValue = migrationCookie.split("=")[1];
      const data: MigrationData = JSON.parse(decodeURIComponent(cookieValue));

      // Build a descriptive message
      const parts: string[] = [];

      if (data.bookmarks_migrated > 0) {
        parts.push(
          `${data.bookmarks_migrated} bookmark${data.bookmarks_migrated !== 1 ? "s" : ""} migrated`
        );
      }

      if (data.bookmarks_merged > 0) {
        parts.push(
          `${data.bookmarks_merged} bookmark${data.bookmarks_merged !== 1 ? "s" : ""} merged`
        );
      }

      if (data.tags_migrated > 0) {
        parts.push(
          `${data.tags_migrated} tag${data.tags_migrated !== 1 ? "s" : ""} migrated`
        );
      }

      if (data.tags_merged > 0) {
        parts.push(
          `${data.tags_merged} tag${data.tags_merged !== 1 ? "s" : ""} merged`
        );
      }

      // Only show toast if there's actual migration data
      if (parts.length > 0) {
        toast.success("Account linked successfully!", {
          description: parts.join(", "),
          duration: 5000, // Show for 5 seconds
          onDismiss: () => {
            deleteMigrationCookie();
          },
          onAutoClose: () => {
            deleteMigrationCookie();
          },
        });
      } else {
        // No data to migrate, just delete the cookie
        deleteMigrationCookie();
      }
    } catch (error) {
      console.error("Failed to parse migration data:", error);
      // Delete the cookie even if parsing failed
      deleteMigrationCookie();
    }
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Deletes the migration_data cookie by setting it with an expired date
 */
function deleteMigrationCookie() {
  document.cookie =
    "migration_data=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax";
}

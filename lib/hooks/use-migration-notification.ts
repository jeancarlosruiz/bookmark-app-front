"use client";

import { useEffect } from "react";
import { toast } from "sonner";

/**
 * Hook to check for migration success cookie and show notification
 * Should be used in the root layout or main page after authentication
 */
export function useMigrationNotification() {
  useEffect(() => {
    // Check for migration success cookie
    const cookies = document.cookie.split("; ");
    const migrationCookie = cookies.find((c) =>
      c.startsWith("migration_success="),
    );

    if (migrationCookie) {
      try {
        const data = JSON.parse(
          decodeURIComponent(migrationCookie.split("=")[1]),
        );

        // Show success toast with migration details
        const message = data.bookmarks_migrated
          ? `Successfully migrated ${data.bookmarks_migrated} bookmark${data.bookmarks_migrated !== 1 ? "s" : ""}!`
          : "Account created successfully!";

        toast.success(message, {
          description: "Your data has been transferred to your new account.",
          duration: 4000,
        });

        // Clear the cookie by setting it to expire immediately
        document.cookie =
          "migration_success=; path=/; max-age=0; sameSite=lax";
      } catch (error) {
        console.error("Failed to parse migration cookie:", error);
      }
    }
  }, []);
}

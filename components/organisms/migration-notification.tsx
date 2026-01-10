"use client";

import { useMigrationNotification } from "@/lib/hooks/use-migration-notification";

/**
 * Component that checks for migration notifications and displays toasts
 * Should be mounted in the dashboard layout to catch redirects after successful auth
 */
export function MigrationNotification() {
  useMigrationNotification();
  return null; // This component doesn't render anything
}

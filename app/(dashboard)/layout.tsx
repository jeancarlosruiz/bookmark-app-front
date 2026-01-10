import * as React from "react";
import { SidebarProvider } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";
import { AppHeader } from "@/components/organisms/app-header";
import { MigrationNotification } from "@/components/organisms/migration-notification";
import { authService } from "@/lib/dal/auth";

// Force dynamic rendering because AppSidebar uses authentication (headers/cookies)
// This prevents Next.js from trying to statically render during build
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await authService.getCurrentUser();

  const user = session?.user
    ? {
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
        isAnonymous: session.user.isAnonymous ?? false,
      }
    : null;

  return (
    <SidebarProvider>
      <MigrationNotification />
      <AppSidebar />
      <main className="flex flex-col w-full bg-[var(--neutral-200)] dark:bg-[var(--neutral-900-dark)] min-h-screen">
        <AppHeader user={user} />
        {children}
      </main>
    </SidebarProvider>
  );
}

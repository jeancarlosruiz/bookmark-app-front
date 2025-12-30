import * as React from "react";
import { SidebarProvider } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";
import { AppHeader } from "@/components/organisms/app-header";

// Force dynamic rendering because AppSidebar uses authentication (headers/cookies)
// This prevents Next.js from trying to statically render during build
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col w-full bg-[var(--neutral-200)] dark:bg-[var(--neutral-900-dark)] min-h-screen">
        <AppHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}

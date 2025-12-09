import * as React from "react";
import { SidebarProvider } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";
import { AppHeader } from "@/components/organisms/app-header";
import { BookmarkListHeader } from "@/components/organisms/bookmark-list-header";
import { BookmarkCard } from "@/components/organisms/bookmark-card";
import { SortOption } from "@/components/organisms/sort-by-dropdown";
import bookmarksData from "@/data.json";
import { stackServerApp } from "@/stack/server";

export default async function Home() {
  const user = await stackServerApp.getUser();

  console.log(user);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <section className="p-[var(--spacing-400)] flex flex-col gap-5">
          <BookmarkListHeader />

          {/* Bookmark Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(338px,1fr))] auto-rows-[272px] gap-[var(--spacing-400,32px)]">
            {bookmarksData.bookmarks.map((bookmark) => (
              <BookmarkCard bookmark={bookmark} key={bookmark.id} />
            ))}
          </div>
        </section>
      </main>
    </SidebarProvider>
  );
}

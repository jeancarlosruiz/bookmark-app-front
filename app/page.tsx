"use client";

import * as React from "react";
import { SidebarProvider } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";
import { AppHeader } from "@/components/organisms/app-header";
import { BookmarkListHeader } from "@/components/organisms/bookmark-list-header";
import { BookmarkCard } from "@/components/organisms/bookmark-card";
import { SortOption } from "@/components/organisms/sort-by-dropdown";
import bookmarksData from "@/data.json";

export default function Home() {
  const [sortOption, setSortOption] =
    React.useState<SortOption>("recently-added");

  // Sort bookmarks based on selected option
  const sortedBookmarks = React.useMemo(() => {
    const sorted = [...bookmarksData.bookmarks];

    switch (sortOption) {
      case "recently-added":
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "recently-visited":
        return sorted.sort((a, b) => {
          if (!a.lastVisited) return 1;
          if (!b.lastVisited) return -1;
          return (
            new Date(b.lastVisited).getTime() -
            new Date(a.lastVisited).getTime()
          );
        });
      case "most-visited":
        return sorted.sort((a, b) => b.visitCount - a.visitCount);
      default:
        return sorted;
    }
  }, [bookmarksData.bookmarks, sortOption]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AppHeader />
        <section className="p-[var(--spacing-400)] flex flex-col gap-5">
          <BookmarkListHeader
            selectedSort={sortOption}
            onSortChange={setSortOption}
          />

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

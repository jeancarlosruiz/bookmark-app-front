import { SidebarProvider } from "@/components/atoms/sidebar";
import { AppSidebar } from "@/components/organisms/app-sidebar";
import { AppHeader } from "@/components/organisms/app-header";
import { BookmarkListHeader } from "@/components/organisms/bookmark-list-header";
import { BookmarkCard } from "@/components/organisms/bookmark-card";
import { EmptyBookmarks } from "@/components/organisms/empty-bookmarks";
import { getBookmarksAction } from "@/actions/bookmarks";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { data: bookmarks } = await getBookmarksAction();

  const data = bookmarks?.data;

  console.log(data);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full bg-[var(--neutral-200)] dark:bg-[var(--neutral-900-dark)] min-h-screen">
        <AppHeader />
        <section className="p-[var(--spacing-200,16px)] md:px-[32px] md:py-[var(--spacing-400,32px)] flex flex-col gap-5 md:pt-[var(--spacing-400,32px)]">
          <BookmarkListHeader />

          {/* Bookmark Grid */}
          {data?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(338px,1fr))] auto-rows-[272px] gap-[var(--spacing-200,16px)] md:gap-[var(--spacing-400,32px)]">
              {data.map((bookmark) => (
                <BookmarkCard bookmark={bookmark} key={bookmark.id} />
              ))}
            </div>
          ) : (
            <EmptyBookmarks />
          )}
        </section>
      </main>
    </SidebarProvider>
  );
}

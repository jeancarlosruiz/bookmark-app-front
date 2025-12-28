import { IPagination } from "@/lib/dal/bookmark";
import { BookmarkListHeader } from "../organisms/bookmark-list-header";
import { EmptyBookmarks } from "../organisms/empty-bookmarks";
import { BookmarkType } from "@/lib/zod/bookmark";
import { BookmarkCard } from "../organisms/bookmark-card";
import LoadMoreButton from "../molecules/load-more-button";

// import BookmarkPagination from "../molecules/bookmark-pagination";

export interface BookmarkContainerProps {
  title?: string;
  emptyState?: {
    title: string;
    description: string;
    icon: React.ReactNode;
    buttonText?: string;
  };
  result: {
    success: boolean;
    data?: BookmarkType[];
    pagination?: IPagination;
  };
}

export default function BookmarkContainer({
  result,
  title,
  emptyState,
}: BookmarkContainerProps) {
  if (!result.success) {
    return (
      <section className="p-[var(--spacing-200,16px)] md:px-[32px] md:py-[var(--spacing-400,32px)] flex flex-col gap-5 md:pt-[var(--spacing-400,32px)]">
        <BookmarkListHeader title={title} />
        <EmptyBookmarks
          title={emptyState?.title}
          description={emptyState?.description}
          icon={emptyState?.icon}
          buttonText={emptyState?.buttonText}
        />
      </section>
    );
  }

  const bookmarks = result.data;

  return (
    <section className="flex-1 p-[var(--spacing-200,16px)] md:px-[32px] md:py-[var(--spacing-400,32px)] flex flex-col gap-5 md:pt-[var(--spacing-400,32px)]">
      <BookmarkListHeader title={title} />

      {/* Bookmark Grid */}
      {bookmarks?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(338px,1fr))] auto-rows-[272px] gap-[var(--spacing-200,16px)] md:gap-[var(--spacing-400,32px)]">
          {bookmarks.map((bookmark) => (
            <BookmarkCard bookmark={bookmark} key={bookmark.id} />
          ))}
        </div>
      ) : (
        <EmptyBookmarks
          title={emptyState?.title}
          description={emptyState?.description}
          icon={emptyState?.icon}
          buttonText={emptyState?.buttonText}
        />
      )}

      {/* <BookmarkPagination pagination={result?.pagination} /> */}
      <LoadMoreButton pagination={result.pagination!} />
    </section>
  );
}

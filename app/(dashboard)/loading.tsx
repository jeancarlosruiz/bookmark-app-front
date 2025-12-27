import { BookmarkCardSkeleton } from "@/components/organisms/bookmark-card-skeleton";
import { Button } from "@/components/atoms/button";
import { ArrowUpDown } from "lucide-react";
import { range } from "@/lib/utils";

export default function Loading() {
  const skeletonCards = range(9);

  return (
    <section className="p-[var(--spacing-200,16px)] md:px-[32px] md:py-[var(--spacing-400,32px)] flex flex-col gap-5 md:pt-[var(--spacing-400,32px)]">
      {/* Header with tags skeleton */}
      <div className="flex gap-[var(--spacing-200,16px)] items-center">
        <h1 className="flex-1 font-bold text-[24px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
          All bookmarks
        </h1>
        <div className="flex gap-[var(--spacing-200,16px)] items-center justify-end">
          <Button
            hierarchy="secondary"
            size="sm"
            iconLeading={<ArrowUpDown className="size-5" />}
            disabled={true}
          >
            Sort by
          </Button>
        </div>
      </div>

      {/* Bookmark Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(338px,1fr))] auto-rows-[272px] gap-[var(--spacing-200,16px)] md:gap-[var(--spacing-400,32px)]">
        {skeletonCards.map((index) => (
          <BookmarkCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}

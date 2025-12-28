"use client";

import { Button } from "@/components/atoms/button";
import { IPagination } from "@/lib/dal/bookmark";
import { useQueryState, parseAsInteger } from "nuqs";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

interface LoadMoreButtonProps {
  pagination: IPagination;
}

export default function LoadMoreButton({ pagination }: LoadMoreButtonProps) {
  const [isLoading, startTransition] = useTransition();
  const [page, setPage] = useQueryState(
    "limit",
    parseAsInteger
      .withOptions({
        startTransition,
        shallow: false, // Force fetch
        scroll: false, // Disable auto scroll - just append content
      })
      .withDefault(10),
  );

  const { hasNext } = pagination;

  // Don't render if there are no more pages
  if (!hasNext) {
    return null;
  }

  const handleLoadMore = () => {
    // Prevent loading more if already loading
    if (isLoading) return;

    // Increment page by 1
    setPage(page + 10);
  };

  return (
    <div className="flex justify-center items-center mt-[var(--spacing-400,32px)]">
      <Button
        onClick={handleLoadMore}
        disabled={isLoading}
        hierarchy="secondary"
        size="md"
        className={isLoading ? "pointer-events-none" : ""}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Loading...
          </>
        ) : (
          "Load More"
        )}
      </Button>
    </div>
  );
}

"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { SortByDropdown } from "@/components/organisms/sort-by-dropdown";
import { useSearch } from "@/lib/hooks/use-search";

export interface BookmarkListHeaderProps {
  title?: string;
  className?: string;
}

const BookmarkListHeader = React.forwardRef<
  HTMLDivElement,
  BookmarkListHeaderProps
>(({ title = "All bookmarks", className }, ref) => {
  const { search } = useSearch();

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-[var(--spacing-200,16px)] items-center",
        className,
      )}
    >
      {search ? (
        <h1 className="flex-1 font-bold text-[24px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
          Results for: &quot;{search}&quot;
        </h1>
      ) : (
        <h1 className="flex-1 font-bold text-[24px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
          {title}
        </h1>
      )}
      <div className="flex gap-[var(--spacing-200,16px)] items-center justify-end">
        <SortByDropdown />
      </div>
    </div>
  );
});

BookmarkListHeader.displayName = "BookmarkListHeader";

export { BookmarkListHeader };

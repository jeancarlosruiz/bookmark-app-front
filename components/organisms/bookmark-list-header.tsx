"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import { SortByDropdown, SortOption } from "@/components/organisms/sort-by-dropdown";

export interface BookmarkListHeaderProps {
  title?: string;
  selectedSort?: SortOption;
  onSortChange?: (option: SortOption) => void;
  className?: string;
}

const BookmarkListHeader = React.forwardRef<
  HTMLDivElement,
  BookmarkListHeaderProps
>(({ title = "All bookmarks", selectedSort, onSortChange, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex gap-[var(--spacing-200,16px)] items-center", className)}
    >
      <h1 className="flex-1 font-bold text-[24px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
        {title}
      </h1>
      <div className="flex gap-[var(--spacing-200,16px)] items-center justify-end">
        <SortByDropdown
          trigger={
            <Button
              hierarchy="secondary"
              size="sm"
              iconLeading={<ArrowUpDown className="size-5" />}
            >
              Sort by
            </Button>
          }
          selectedOption={selectedSort}
          onSortChange={onSortChange}
        />
      </div>
    </div>
  );
});

BookmarkListHeader.displayName = "BookmarkListHeader";

export { BookmarkListHeader };

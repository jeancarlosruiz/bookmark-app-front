import * as React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/atoms/skeleton";

export interface BookmarkCardSkeletonProps {
  className?: string;
}

const BookmarkCardSkeleton = React.forwardRef<
  HTMLDivElement,
  BookmarkCardSkeletonProps
>(({ className }, ref) => {
  return (
    <article
      ref={ref}
      className={cn(
        "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col items-start overflow-hidden rounded-[12px] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full",
        className,
      )}
    >
      {/* Container */}
      <div className="flex flex-col gap-4 items-start p-[var(--spacing-200,16px)] rounded-[10px] w-full flex-1">
        {/* Header */}
        <div className="flex gap-[var(--spacing-150,12px)] items-start w-full">
          {/* Logo */}
          <Skeleton className="size-[44px] rounded-[8px] shrink-0" />

          {/* Info */}
          <div className="flex-1 flex flex-col gap-[var(--spacing-050,4px)] min-w-0">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Options button */}
          <Skeleton className="size-9 rounded-md shrink-0" />
        </div>

        {/* Divider */}
        <div className="bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] h-px w-full" />

        {/* Description */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Tags */}
        <div className="flex gap-[var(--spacing-100,8px)] items-start w-full">
          <Skeleton className="h-6 w-16 rounded-[var(--radius-4,4px)]" />
          <Skeleton className="h-6 w-20 rounded-[var(--radius-4,4px)]" />
          <Skeleton className="h-6 w-14 rounded-[var(--radius-4,4px)]" />
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--neutral-300,#dde9e7)] dark:border-[var(--neutral-600-dark,#002e2d)] flex gap-[var(--spacing-100,8px)] items-center px-[var(--spacing-200,16px)] py-[var(--spacing-150,12px)] w-full">
        <Skeleton className="h-4 w-20" />
        <div className="h-4 w-px bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)]" />
        <Skeleton className="h-4 w-24" />
        <div className="h-4 w-px bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)]" />
        <Skeleton className="h-4 w-20" />
      </div>
    </article>
  );
});

BookmarkCardSkeleton.displayName = "BookmarkCardSkeleton";

export { BookmarkCardSkeleton };

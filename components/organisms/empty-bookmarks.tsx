import * as React from "react";
import { BookmarkX, Plus } from "lucide-react";
import { Button } from "@/components/atoms/button";

export interface EmptyBookmarksProps {
  className?: string;
  onAddBookmark?: () => void;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  buttonText?: string;
}

const EmptyBookmarks = React.forwardRef<HTMLDivElement, EmptyBookmarksProps>(
  (
    {
      className,
      onAddBookmark,
      title = "No bookmarks yet",
      description = "Start building your collection by adding your first bookmark. Save your favorite websites, articles, and resources in one place.",
      icon,
      buttonText = "Add Your First Bookmark",
    },
    ref,
  ) => {
    const defaultIcon = (
      <BookmarkX className="w-12 h-12 text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-500-dark,#004241)]" />
    );

    return (
      <div
        ref={ref}
        className={`col-span-full flex flex-col items-center justify-center py-[var(--spacing-1000,80px)] px-[var(--spacing-400,32px)] ${className || ""}`}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-24 h-24 mb-[var(--spacing-400,32px)] rounded-full bg-[var(--neutral-200,#e8f0ef)] dark:bg-[var(--neutral-800-dark,#001f1f)]">
          {icon || defaultIcon}
        </div>

        {/* Title */}
        <h3 className="text-[24px] font-bold leading-[1.3] text-[var(--neutral-900,#051513)] dark:text-[var(--neutral-0-dark,#ffffff)] mb-[var(--spacing-150,12px)] text-center">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[16px] font-medium leading-[1.5] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] mb-[var(--spacing-400,32px)] text-center max-w-[400px]">
          {description}
        </p>

        {/* CTA Button */}
        {onAddBookmark && (
          <Button
            hierarchy="primary"
            size="md"
            onClick={onAddBookmark}
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            {buttonText}
          </Button>
        )}
      </div>
    );
  },
);

EmptyBookmarks.displayName = "EmptyBookmarks";

export { EmptyBookmarks };

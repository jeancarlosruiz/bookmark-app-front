import * as React from "react";
import { MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookmarkCardHeader } from "@/components/molecules/bookmark-card-header";
import { BookmarkCardFooter } from "@/components/molecules/bookmark-card-footer";
import { Tag } from "@/components/atoms/tag";
import { IconButton } from "@/components/atoms/icon-button";
import { BookmarkActionsDropdown } from "@/components/organisms/bookmark-actions-dropdown";

type BookmarkInfo = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  createdAt: string;
  lastVisited: string | null;
};

export interface BookmarkCardProps {
  bookmark: BookmarkInfo;
  className?: string;
}

const BookmarkCard = React.forwardRef<HTMLDivElement, BookmarkCardProps>(
  ({ bookmark, className }, ref) => {
    const {
      favicon,
      title,
      description,
      url,
      tags,
      visitCount,
      lastVisited,
      createdAt,
      pinned,
      isArchived,
    } = bookmark;

    return (
      <article
        ref={ref}
        className={cn(
          "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col items-start overflow-hidden rounded-[12px] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full",
          isArchived && "opacity-60",
          className,
        )}
      >
        {/* Container */}
        <div className="flex flex-col gap-4 items-start p-[var(--spacing-200,16px)] rounded-[10px] w-full flex-1">
          {/* Header */}
          <div className="flex gap-[var(--spacing-150,12px)] items-start w-full">
            <BookmarkCardHeader
              logo={favicon}
              title={title}
              url={url}
              onOptionsClick={() => {}}
            />
            <BookmarkActionsDropdown
              trigger={
                <IconButton size="sm" variant="default" aria-label="Options">
                  <MoreVertical className="size-5" />
                </IconButton>
              }
              isPinned={pinned}
              isArchived={isArchived}
            />
          </div>

          {/* Divider */}
          <div className="bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] h-px w-full" />

          {/* Description */}
          <p className="flex-1 font-medium text-[14px] leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] w-full">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-[var(--spacing-100,8px)] items-start w-full">
            {tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--neutral-300,#dde9e7)] dark:border-[var(--neutral-600-dark,#002e2d)] flex gap-[var(--spacing-100,8px)] items-center px-[var(--spacing-200,16px)] py-[var(--spacing-150,12px)] w-full">
          <BookmarkCardFooter
            views={visitCount}
            time={lastVisited}
            date={createdAt}
          />
        </div>
      </article>
    );
  },
);

BookmarkCard.displayName = "BookmarkCard";

export { BookmarkCard };

"use client";

import * as React from "react";
import { Eye, Clock, Calendar, Pin } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../atoms/tooltip";

export interface BookmarkCardFooterProps {
  views: number;
  lastTimeVisited: string | null;
  createdAt: string;
  pinned: boolean;
  isArchived: boolean;
  className?: string;
}

const BookmarkCardFooter = React.forwardRef<
  HTMLDivElement,
  BookmarkCardFooterProps
>(({ views, lastTimeVisited, createdAt, className, pinned, isArchived }, ref) => {
  const createdAtConverted = formatDate(createdAt);
  const lastTimeVisitedConverted = formatDate(lastTimeVisited);

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-[var(--spacing-200,16px)] items-center w-full",
        className,
      )}
    >
      {/* Views */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex gap-[var(--spacing-075,6px)] items-center cursor-pointer">
            <Eye
              className="size-4 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
              {views}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Total views</p>
        </TooltipContent>
      </Tooltip>

      {/* Last Time Visited */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex gap-[var(--spacing-075,6px)] items-center cursor-pointer">
            <Clock
              className="size-4 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
              {lastTimeVisitedConverted}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Last visited</p>
        </TooltipContent>
      </Tooltip>

      {/* Date Created */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex gap-[var(--spacing-075,6px)] items-center cursor-pointer">
            <Calendar
              className="size-4 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
              {createdAtConverted}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Date created</p>
        </TooltipContent>
      </Tooltip>

      {/* Right side indicators */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Pinned */}
        {pinned && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="cursor-pointer">
                <Pin
                  className="size-4 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                  strokeWidth={2}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Pinned to top</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Archived */}
        {isArchived && (
          <div className="bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] flex items-center justify-center px-[6px] rounded-[4px]">
            <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] text-center whitespace-nowrap">
              Archived
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

BookmarkCardFooter.displayName = "BookmarkCardFooter";

export { BookmarkCardFooter };

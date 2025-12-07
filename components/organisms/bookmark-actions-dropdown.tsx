"use client";

import * as React from "react";
import {
  ExternalLink,
  Copy,
  Pin,
  PinOff,
  SquarePen,
  Archive,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/atoms/dropdown-menu";

export interface BookmarkActionsDropdownProps {
  trigger?: React.ReactNode;
  isPinned?: boolean;
  isArchived?: boolean;
  className?: string;
}

const BookmarkActionsDropdown = React.forwardRef<
  HTMLDivElement,
  BookmarkActionsDropdownProps
>(({ trigger, isPinned = false, isArchived = false, className }, ref) => {
  const onVisit = () => {};
  const onCopyUrl = () => {};
  const onPin = () => {};
  const onUnpin = () => {};
  const onEdit = () => {};
  const onArchive = () => {};
  const onUnarchive = () => {};
  const onDelete = () => {};

  const handleVisit = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyUrl = async (url: string, title: string) => {
    try {
      await navigator.clipboard.writeText(url);
      console.log(`URL copied for ${title}`);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

      <DropdownMenuContent
        ref={ref}
        className={cn(
          "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] border border-[var(--neutral-100,#e8f0ef)] dark:border-[var(--neutral-600-dark,#002e2d)] flex flex-col gap-[var(--spacing-050,4px)] items-start p-[var(--spacing-100,8px)] rounded-[8px] shadow-[0px_6px_14px_0px_rgba(34,38,39,0.1)] w-[200px]",
          className,
        )}
        sideOffset={5}
        align="end"
      >
        {/* Visit */}
        <DropdownMenuItem
          className={cn(
            "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
            "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
            "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
          )}
          onClick={onVisit}
        >
          <ExternalLink
            className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
            strokeWidth={2}
          />
          <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
            Visit
          </span>
        </DropdownMenuItem>

        {/* Copy URL */}
        <DropdownMenuItem
          className={cn(
            "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
            "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
            "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
          )}
          onClick={onCopyUrl}
        >
          <Copy
            className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
            strokeWidth={2}
          />
          <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
            Copy URL
          </span>
        </DropdownMenuItem>

        {/* Conditional: Pin/Unpin OR Unarchive */}
        {isArchived ? (
          <DropdownMenuItem
            className={cn(
              "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
              "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
              "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
            )}
            onClick={onUnarchive}
          >
            <RotateCcw
              className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Unarchive
            </span>
          </DropdownMenuItem>
        ) : isPinned ? (
          <DropdownMenuItem
            className={cn(
              "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
              "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
              "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
            )}
            onClick={onUnpin}
          >
            <PinOff
              className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Unpin
            </span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className={cn(
              "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
              "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
              "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
            )}
            onClick={onPin}
          >
            <Pin
              className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Pin
            </span>
          </DropdownMenuItem>
        )}

        {/* Edit (not shown for archived) */}
        {!isArchived && (
          <DropdownMenuItem
            className={cn(
              "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
              "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
              "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
            )}
            onClick={onEdit}
          >
            <SquarePen
              className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Edit
            </span>
          </DropdownMenuItem>
        )}

        {/* Archive or Delete Permanently */}
        {isArchived ? (
          <DropdownMenuItem
            className={cn(
              "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
              "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
              "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
            )}
            onClick={onDelete}
          >
            <Trash2
              className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Delete Permanently
            </span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className={cn(
              "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
              "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
              "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
            )}
            onClick={onArchive}
          >
            <Archive
              className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Archive
            </span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

BookmarkActionsDropdown.displayName = "BookmarkActionsDropdown";

export { BookmarkActionsDropdown };

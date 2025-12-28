"use client";

import { useState, forwardRef } from "react";
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
import { toast } from "sonner";
import EditBookmarkForm from "./edit-bookmark-form";
import { BookmarkType } from "@/lib/zod/bookmark";
import { toggleArchived, togglePinned } from "@/actions/bookmarks";

export interface BookmarkActionsDropdownProps {
  trigger?: React.ReactNode;
  className?: string;
  bookmark: BookmarkType;
}

const BookmarkActionsDropdown = forwardRef<
  HTMLDivElement,
  BookmarkActionsDropdownProps
>(({ bookmark, trigger, className }, ref) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const sleep = (ms: number = 2000) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const onVisit = async () => {
    // Aqui se ejecutara una llamada http para aumentar el conteo de visitas, luego se ira al link
    setIsDisabled(true);
    await sleep();

    window.open(bookmark.url, "_blank", "noopener,noreferrer");

    setIsDisabled(false);
  };

  const onCopyUrl = () => {
    navigator.clipboard.writeText(bookmark.url);

    toast("Link copied to clipboard.", { icon: <Copy className="size-5" /> });
  };

  const handleArchive = async (bookmarkId: number) => {
    setIsDisabled(true);

    try {
      const result = await toggleArchived(bookmarkId);

      if (result.success) {
        const isArchived = result.data?.isArchived;
        toast(isArchived ? "Bookmark archived." : "Bookmark restored.", {
          icon: isArchived ? (
            <Archive className="size-5" />
          ) : (
            <RotateCcw className="size-5" />
          ),
        });
      } else {
        toast.error("Failed to update bookmark", {
          description: result.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later",
      });
      console.error("Toggle pin error:", error);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleTogglePin = async (bookmarkId: number) => {
    setIsDisabled(true);

    try {
      const result = await togglePinned(bookmarkId);

      if (result.success) {
        const isPinned = result.data?.pinned;
        toast(isPinned ? "Bookmark pinned to top." : "Bookmark unpinned.", {
          icon: isPinned ? (
            <Pin className="size-5" />
          ) : (
            <PinOff className="size-5" />
          ),
        });
      } else {
        toast.error("Failed to update bookmark", {
          description: result.error || "Please try again",
        });
      }
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description: "Please try again later",
      });
      console.error("Toggle pin error:", error);
    } finally {
      setIsDisabled(false);
    }
  };

  const onEdit = () => {
    setIsDialogOpen(true);
  };
  const onArchive = () => {};
  const onUnarchive = () => {};
  const onDelete = () => {};

  return (
    <>
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
            disabled={isDisabled}
            onClick={onVisit}
          >
            <ExternalLink
              className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
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
              className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              strokeWidth={2}
            />
            <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Copy URL
            </span>
          </DropdownMenuItem>

          {/* Conditional: Pin/Unpin OR Unarchive */}
          {bookmark.isArchived ? (
            <DropdownMenuItem
              className={cn(
                "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
              )}
              disabled={isDisabled}
              onClick={() => handleArchive(bookmark.id)}
            >
              <RotateCcw
                className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                strokeWidth={2}
              />
              <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Unarchive
              </span>
            </DropdownMenuItem>
          ) : bookmark.pinned ? (
            <DropdownMenuItem
              className={cn(
                "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
              )}
              disabled={isDisabled}
              onClick={() => handleTogglePin(bookmark.id)}
            >
              <PinOff
                className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
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
              disabled={isDisabled}
              onClick={() => handleTogglePin(bookmark.id)}
            >
              <Pin
                className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                strokeWidth={2}
              />
              <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Pin
              </span>
            </DropdownMenuItem>
          )}

          {/* Edit (not shown for archived) */}
          {!bookmark.isArchived && (
            <DropdownMenuItem
              className={cn(
                "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
              )}
              onClick={onEdit}
            >
              <SquarePen
                className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                strokeWidth={2}
              />
              <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Edit
              </span>
            </DropdownMenuItem>
          )}

          {/* Archive or Delete Permanently */}
          {bookmark.isArchived ? (
            <DropdownMenuItem
              className={cn(
                "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
              )}
              onClick={onDelete}
            >
              <Trash2
                className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
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
              onClick={() => handleArchive(bookmark.id)}
            >
              <Archive
                className="size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                strokeWidth={2}
              />
              <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Archive
              </span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditBookmarkForm
        dialogOpen={isDialogOpen}
        setDialogOpen={setIsDialogOpen}
        bookmark={bookmark}
      />
    </>
  );
});

BookmarkActionsDropdown.displayName = "BookmarkActionsDropdown";

export { BookmarkActionsDropdown };

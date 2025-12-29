"use client";

import { forwardRef, useReducer, useEffect } from "react";
import {
  ExternalLink,
  Copy,
  Pin,
  PinOff,
  SquarePen,
  Archive,
  RotateCcw,
  Trash2,
  MoreVertical,
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
import { ConfirmationDialog } from "@/components/molecules/confirmation-dialog";
import { BookmarkType } from "@/lib/zod/bookmark";
import {
  deleteBookmark,
  incrementCount,
  toggleArchived,
  togglePinned,
} from "@/actions/bookmarks";
import { IconButton } from "../atoms/icon-button";

enum OPERATIONS {
  PIN = "PIN",
  ARCHIVE = "ARCHIVE",
  UNARCHIVE = "UNARCHIVE",
  DELETE = "DELETE",
  VISIT = "VISIT",
  COPY = "COPY",
}

type State =
  | { status: "idle" }
  | { status: "dropdown_open" }
  | { status: "edit_dialog" }
  | {
      status: "archive_dialog" | "unarchive_dialog" | "delete_dialog";
      dialog: {
        title: string;
        description: string;
        confirmText: string;
        cancelText: string;
        variant: string;
      };
    }
  | {
      status: "processing";
      operation: OPERATIONS;
    };

type Action =
  | {
      type: "OPEN_DROPDOWN";
    }
  | { type: "CLOSE_DROPDOWN" }
  | {
      type: "OPEN_EDIT";
    }
  | {
      type: "REQUEST_ARCHIVE";
    }
  | { type: "REQUEST_UNARCHIVE" }
  | {
      type: "REQUEST_DELETE";
    }
  | {
      type: "START_PROCESSING";
      operation: OPERATIONS.PIN | OPERATIONS.COPY | OPERATIONS.VISIT;
    }
  | {
      type: "CONFIRM";
    }
  | {
      type: "SUCCESS";
    }
  | {
      type: "ERROR";
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_DROPDOWN":
      return { status: "dropdown_open" };
    case "CLOSE_DROPDOWN":
      return { status: "idle" };
    case "OPEN_EDIT":
      return { status: "edit_dialog" };
    case "REQUEST_ARCHIVE":
      return {
        status: "archive_dialog",
        dialog: {
          title: "Archive bookmark",
          description: "Are you sure you want to archive this bookmark?",
          confirmText: "Archive",
          cancelText: "Cancel",
          variant: "default",
        },
      };
    case "REQUEST_UNARCHIVE":
      return {
        status: "unarchive_dialog",

        dialog: {
          title: "Unarchive bookmark",
          description: "Move this bookmark back to your active list?",
          confirmText: "Unarchive",
          cancelText: "Cancel",
          variant: "default",
        },
      };
    case "REQUEST_DELETE":
      return {
        status: "delete_dialog",
        dialog: {
          title: "Delete bookmark",
          description: "Are you sure you want to delete this bookmark?",
          confirmText: "Delete permanently",
          cancelText: "Cancel",
          variant: "destructive",
        },
      };
    case "START_PROCESSING":
      return { status: "processing", operation: action.operation };
    case "CONFIRM":
      if (state.status === "archive_dialog") {
        return { status: "processing", operation: OPERATIONS.ARCHIVE };
      }

      if (state.status === "unarchive_dialog") {
        return { status: "processing", operation: OPERATIONS.UNARCHIVE };
      }

      if (state.status === "delete_dialog") {
        return { status: "processing", operation: OPERATIONS.DELETE };
      }
      return state;
    case "SUCCESS":
    case "ERROR":
      return { status: "idle" };
    default:
      return state;
  }
};

export interface BookmarkActionsDropdownProps {
  className?: string;
  bookmark: BookmarkType;
}

const BookmarkActionsDropdown = forwardRef<
  HTMLDivElement,
  BookmarkActionsDropdownProps
>(({ bookmark, className }, ref) => {
  const [state, dispatch] = useReducer(reducer, { status: "idle" });
  const isDisabled = state.status === "processing";

  useEffect(() => {
    if (state.status === "processing") {
      executeOperation(state.operation);
    }
  }, [state]);

  const executeOperation = async (operation: OPERATIONS) => {
    switch (operation) {
      case OPERATIONS.PIN:
        try {
          const result = await togglePinned(bookmark.id);
          if (result.success) {
            const isPinned = result.data?.pinned;
            toast(isPinned ? "Bookmark pinned to top." : "Bookmark unpinned.", {
              icon: isPinned ? (
                <Pin className="size-5" />
              ) : (
                <PinOff className="size-5" />
              ),
            });

            dispatch({ type: "SUCCESS" });
          } else {
            dispatch({ type: "ERROR" });
            toast.error("Error trying to pin the bookmark!, try again.");
          }
        } catch (error) {
          dispatch({ type: "ERROR" });
          toast.error("Error trying to pin the bookmark!, try again.");
        }
        break;
      case OPERATIONS.ARCHIVE:
      case OPERATIONS.UNARCHIVE:
        try {
          const result = await toggleArchived(bookmark.id);

          if (result.success) {
            const isArchived = result.data?.isArchived;
            toast(isArchived ? "Bookmark archived." : "Bookmark restored.", {
              icon: isArchived ? (
                <Archive className="size-5" />
              ) : (
                <RotateCcw className="size-5" />
              ),
            });

            dispatch({ type: "SUCCESS" });
          } else {
            toast.error("Failed to update bookmark", {
              description: result.error || "Please try again",
            });

            dispatch({ type: "ERROR" });
          }
        } catch (error) {
          toast.error("An unexpected error occurred", {
            description: "Please try again later",
          });

          dispatch({ type: "ERROR" });
        }
        break;
      case OPERATIONS.DELETE:
        try {
          const result = await deleteBookmark(bookmark.id);

          if (result.success) {
            toast("Bookmark deleted.", {
              icon: <Trash2 className="size-5" />,
            });

            dispatch({ type: "SUCCESS" });
          } else {
            toast.error("Failed to delete bookmark", {
              description: result.error || "Please try again",
            });

            dispatch({ type: "ERROR" });
          }
        } catch (error) {
          toast.error("An unexpected error occurred", {
            description: "Please try again later",
          });
          console.error("Delete error:", error);
        }
        break;
      case OPERATIONS.VISIT:
        try {
          const result = await incrementCount(bookmark.id);
          if (result.success) {
            window.open(bookmark.url, "_blank", "noopener,noreferrer");
            dispatch({ type: "SUCCESS" });
          } else {
            dispatch({ type: "ERROR" });
          }
        } catch (error) {
          dispatch({ type: "ERROR" });
        }
        break;
      case OPERATIONS.COPY:
        navigator.clipboard.writeText(bookmark.url);
        toast("Link copied to clipboard.", {
          icon: <Copy className="size-5" />,
        });

        dispatch({ type: "SUCCESS" });
        break;
    }
  };

  // Action handlers separated by item
  const handleVisit = async (event: Event) => {
    event.preventDefault(); // Prevent menu from closing immediately
    dispatch({ type: "START_PROCESSING", operation: OPERATIONS.VISIT });
  };

  const handleCopyUrl = (event: Event) => {
    event.preventDefault();
    dispatch({ type: "START_PROCESSING", operation: OPERATIONS.COPY });
  };

  const handleTogglePin = async (event: Event) => {
    event.preventDefault();

    dispatch({
      type: "START_PROCESSING",
      operation: OPERATIONS.PIN,
    });
  };

  const handleEdit = (event: Event) => {
    event.preventDefault();
    dispatch({ type: "OPEN_EDIT" });
  };

  // Shared item styles
  const itemClassName = cn(
    "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
    "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
    "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
  );

  const iconClassName =
    "size-4 shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]";

  const textClassName =
    "flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]";

  return (
    <>
      <DropdownMenu
        modal={false}
        open={state.status === "dropdown_open"}
        onOpenChange={(open) =>
          dispatch({ type: open ? "OPEN_DROPDOWN" : "CLOSE_DROPDOWN" })
        }
      >
        <DropdownMenuTrigger asChild>
          <IconButton size="sm" variant="default" aria-label="Options">
            <MoreVertical className="size-5" />
          </IconButton>
        </DropdownMenuTrigger>

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
            className={itemClassName}
            disabled={isDisabled}
            onSelect={handleVisit}
          >
            <ExternalLink className={iconClassName} strokeWidth={2} />
            <span className={textClassName}>Visit</span>
          </DropdownMenuItem>

          {/* Copy URL */}
          <DropdownMenuItem className={itemClassName} onSelect={handleCopyUrl}>
            <Copy className={iconClassName} strokeWidth={2} />
            <span className={textClassName}>Copy URL</span>
          </DropdownMenuItem>

          {/* Conditional: Pin/Unpin OR Unarchive */}
          {bookmark.isArchived ? (
            <DropdownMenuItem
              className={itemClassName}
              disabled={isDisabled}
              onSelect={() => dispatch({ type: "REQUEST_UNARCHIVE" })}
            >
              <RotateCcw className={iconClassName} strokeWidth={2} />
              <span className={textClassName}>Unarchive</span>
            </DropdownMenuItem>
          ) : bookmark.pinned ? (
            <DropdownMenuItem
              className={itemClassName}
              disabled={isDisabled}
              onSelect={handleTogglePin}
            >
              <PinOff className={iconClassName} strokeWidth={2} />
              <span className={textClassName}>Unpin</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className={itemClassName}
              disabled={isDisabled}
              onSelect={handleTogglePin}
            >
              <Pin className={iconClassName} strokeWidth={2} />
              <span className={textClassName}>Pin</span>
            </DropdownMenuItem>
          )}

          {/* Edit (not shown for archived) */}
          {!bookmark.isArchived && (
            <DropdownMenuItem className={itemClassName} onSelect={handleEdit}>
              <SquarePen className={iconClassName} strokeWidth={2} />
              <span className={textClassName}>Edit</span>
            </DropdownMenuItem>
          )}

          {/* Archive or Delete Permanently */}
          {bookmark.isArchived ? (
            <DropdownMenuItem
              className={itemClassName}
              disabled={isDisabled}
              onSelect={() => dispatch({ type: "REQUEST_DELETE" })}
            >
              <Trash2 className={iconClassName} strokeWidth={2} />
              <span className={textClassName}>Delete Permanently</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className={itemClassName}
              disabled={isDisabled}
              onSelect={() => dispatch({ type: "REQUEST_ARCHIVE" })}
            >
              <Archive className={iconClassName} strokeWidth={2} />
              <span className={textClassName}>Archive</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditBookmarkForm
        dialogOpen={state.status === "edit_dialog"}
        setDialogOpen={(open) => {
          if (!open) dispatch({ type: "CLOSE_DROPDOWN" });
        }}
        bookmark={bookmark}
      />

      {/*CONFIRMATION DIALOGS BASED ON STATUS*/}
      {"dialog" in state && (
        <ConfirmationDialog
          open={[
            "archive_dialog",
            "unarchive_dialog",
            "delete_dialog",
          ].includes(state.status)}
          onOpenChange={(open) => {
            if (!open) dispatch({ type: "CLOSE_DROPDOWN" });
          }}
          title={state.dialog.title}
          description={state.dialog.description}
          confirmText={state.dialog.confirmText}
          cancelText={state.dialog.cancelText}
          variant={state.dialog.variant as "default" | "destructive"}
          onConfirm={() => dispatch({ type: "CONFIRM" })}
          loading={isDisabled}
        />
      )}
    </>
  );
});

BookmarkActionsDropdown.displayName = "BookmarkActionsDropdown";

export { BookmarkActionsDropdown };

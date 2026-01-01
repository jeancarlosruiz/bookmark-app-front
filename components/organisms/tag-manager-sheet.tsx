"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/atoms/sheet";
import { Badge } from "@/components/atoms/badge";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Separator } from "@/components/atoms/separator";
import { Settings, Pencil, Trash2, Check, X, Loader2 } from "lucide-react";
import { TagsType } from "@/lib/zod/tag";
import { updateTagAction, deleteTagAction } from "@/actions/tags";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import TagForm from "./tag-form";
import { ConfirmationDialog } from "../molecules/confirmation-dialog";

export interface TagManagerSheetProps {
  tags: TagsType[];
  trigger?: React.ReactNode;
}

// Operations:
enum OPERATIONS {
  EDIT = "EDIT",
  DELETE = "DELETE",
}

// Estado: idle, sheet open, update_tag, delete_tag, processing
type State =
  | {
      status: "idle";
    }
  | {
      status: "sheet_open";
    }
  | {
      status: "editing";
      tagId: number;
      editValue: string;
    }
  | {
      status: "delete_dialog";
      tagId: number;
      dialog: {
        title: string;
        description: string;
        confirmText: string;
        cancelText: string;
        variant: "default" | "destructive";
      };
    }
  | {
      status: "processing";
      operation: OPERATIONS;
      payload: {
        tagId: number;
        newValue?: string;
      };
    };

// Actions: Open sheet, Close sheet, Update, request delete, start processing, confirm, success, error
type Actions =
  | { type: "SHEET_OPEN" }
  | { type: "SHEET_CLOSE" }
  | { type: "START_EDIT"; tagId: number; currentValue: string }
  | { type: "UPDATE_EDIT_VALUE"; value: string } // Para el input controlado
  | { type: "CANCEL_EDIT" }
  | { type: "SUBMIT_EDIT" } // Transiciona a processing
  | { type: "REQUEST_DELETE"; tagId: number; tagTitle: string }
  | { type: "CANCEL_DELETE" }
  | { type: "CONFIRM_DELETE" }
  | { type: "SUCCESS" }
  | { type: "ERROR" };

const tagReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "SHEET_OPEN":
      return {
        status: "sheet_open",
      };
    case "SHEET_CLOSE":
      return {
        status: "idle",
      };
    case "START_EDIT":
      return {
        status: "editing",
        tagId: action.tagId,
        editValue: action.currentValue,
      };
    case "UPDATE_EDIT_VALUE":
      if (state.status !== "editing") return state;
      return {
        ...state,
        editValue: action.value,
      };
    case "CANCEL_EDIT":
      return { status: "sheet_open" };
    case "SUBMIT_EDIT":
      if (state.status !== "editing") return state;
      return {
        status: "processing",
        operation: OPERATIONS.EDIT,
        payload: {
          tagId: state.tagId,
          newValue: state.editValue,
        },
      };
    case "REQUEST_DELETE":
      return {
        status: "delete_dialog",
        tagId: action.tagId,
        dialog: {
          title: "Delete tag",
          description: `Are you sure you want to delete "${action.tagTitle}?"`,
          confirmText: "Delete permanently",
          cancelText: "Cancel",
          variant: "destructive",
        },
      };
    case "CANCEL_DELETE":
      return {
        status: "sheet_open",
      };
    case "CONFIRM_DELETE":
      if (state.status !== "delete_dialog") return state;
      return {
        status: "processing",
        operation: OPERATIONS.DELETE,
        payload: { tagId: state.tagId },
      };
    case "SUCCESS":
    case "ERROR":
      return { status: "sheet_open" };

    default:
      return state;
  }
};

export function TagManagerSheet({ tags, trigger }: TagManagerSheetProps) {
  const [state, dispatch] = React.useReducer(tagReducer, { status: "idle" });

  // Estamos en un proceso
  const isProcessing = state.status === "processing";

  // Valor del input
  const inputValue = state.status === "editing" ? state.editValue : "";

  const isEditing = (tagId: number) =>
    state.status === "editing" && state.tagId === tagId;

  React.useEffect(() => {
    if (state.status === "processing") {
      executeOperation(state.operation, state.payload);
    }
  }, [state]);

  const executeOperation = async (
    operation: OPERATIONS,
    payload: { tagId: number; newValue?: string },
  ) => {
    switch (operation) {
      case OPERATIONS.EDIT:
        try {
          const result = await updateTagAction(
            payload.tagId,
            payload.newValue!,
          );

          if (result.success) {
            toast.success("Tag updated successfully.");
            dispatch({ type: "SUCCESS" });
          } else {
            dispatch({ type: "ERROR" });
            toast.error("Error trying to update the tag!, try again.");
          }
        } catch (error) {
          dispatch({ type: "ERROR" });
          toast.error("Error trying to update the tag!, try again.");
        }
        break;
      case OPERATIONS.DELETE:
        try {
          const result = await deleteTagAction(payload.tagId);

          if (result.success) {
            toast("Tag deleted.", {
              icon: <Trash2 className="size-5" />,
            });

            dispatch({ type: "SUCCESS" });
          } else {
            toast.error("Failed to delete tag", {
              description: result.error || "Please try again",
            });

            dispatch({ type: "ERROR" });
          }
        } catch (error) {
          toast.error("An unexpected error occurred", {
            description: "Please try again later",
          });
        }
        break;
    }
  };

  return (
    <>
      <Sheet
        open={state.status !== "idle"}
        onOpenChange={(open) =>
          dispatch({ type: open ? "SHEET_OPEN" : "SHEET_CLOSE" })
        }
      >
        <SheetTrigger asChild>
          {trigger || (
            <button
              className="p-1 rounded-[var(--radius-sm,6px)] hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)] transition-colors"
              aria-label="Manage tags"
            >
              <Settings className="size-4 text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)]" />
            </button>
          )}
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[450px] flex flex-col p-0 gap-0">
          <SheetHeader className="px-[var(--spacing-300,24px)] pt-[var(--spacing-300,24px)] pb-[var(--spacing-200,16px)] gap-[var(--spacing-100,8px)] text-left">
            <SheetTitle className="text-[24px] font-bold leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-[var(--neutral-0-dark,#ffffff)]">
              Manage tags
            </SheetTitle>
            <SheetDescription className="text-[14px] font-medium leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-300-dark,#00706e)]">
              Create, rename, or remove tags to organize your bookmarks.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 px-[var(--spacing-300,24px)] pb-[var(--spacing-200,16px)] overflow-hidden flex flex-col gap-[var(--spacing-200,16px)]">
            {/*Aqui va el formulario*/}
            <TagForm />
            <Separator />

            {/* Existing tags */}
            <div className="flex-1 overflow-hidden flex flex-col gap-[var(--spacing-150,12px)]">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[14px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-[var(--neutral-0-dark,#ffffff)]">
                  Your tags
                </span>
                <Badge>{tags.length}</Badge>
              </div>

              <ScrollArea className="flex-1 -mx-[var(--spacing-100,8px)]">
                <div className="px-[var(--spacing-100,8px)]">
                  {tags.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-[var(--spacing-600,48px)] text-center">
                      <p className="text-[14px] font-medium leading-[1.5] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                        No tags yet
                      </p>
                      <p className="text-[12px] font-normal leading-[1.4] text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-500-dark,#004241)] mt-[var(--spacing-100,8px)]">
                        Create your first tag above
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[var(--spacing-50,4px)]">
                      {tags.map((tag) => (
                        <div
                          key={tag.id}
                          className={cn(
                            "flex items-center gap-[var(--spacing-100,8px)] px-[var(--spacing-150,12px)] py-[var(--spacing-100,8px)] rounded-[var(--radius-sm,6px)] transition-colors",
                            "tagId" in state && state.tagId === tag.id
                              ? "bg-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-600-dark,#002e2d)]"
                              : "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                          )}
                        >
                          {isEditing(tag.id) ? (
                            <>
                              <input
                                value={inputValue}
                                onChange={(e) =>
                                  dispatch({
                                    type: "UPDATE_EDIT_VALUE",
                                    value: e.target.value,
                                  })
                                }
                                className="flex-1 bg-transparent font-semibold text-[16px] leading-[1.4] outline-none text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                                autoFocus
                                disabled={isProcessing}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter")
                                    dispatch({
                                      type: "SUBMIT_EDIT",
                                    });
                                  if (e.key === "Escape")
                                    dispatch({ type: "CANCEL_EDIT" });
                                }}
                              />
                              <button
                                onClick={() =>
                                  dispatch({ type: "SUBMIT_EDIT" })
                                }
                                disabled={isProcessing}
                                className="p-1 rounded-[var(--radius-4,4px)] text-[var(--teal-700,#014745)] dark:text-[var(--neutral-300-dark,#00706e)] hover:bg-[var(--neutral-200,#e8f0ef)] dark:hover:bg-[var(--neutral-500-dark,#004241)] transition-colors"
                              >
                                {isProcessing ? (
                                  <Loader2 className="size-4 animate-spin" />
                                ) : (
                                  <Check className="size-4" />
                                )}
                              </button>
                              <button
                                onClick={() =>
                                  dispatch({ type: "CANCEL_EDIT" })
                                }
                                disabled={isProcessing}
                                className="p-1 rounded-[var(--radius-4,4px)] text-[var(--neutral-500,#899492)] hover:bg-[var(--neutral-200,#e8f0ef)] dark:hover:bg-[var(--neutral-500-dark,#004241)] transition-colors"
                              >
                                <X className="size-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <p className="flex-1 font-semibold text-[16px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] truncate">
                                {tag.title}
                              </p>
                              <span className="text-[12px] font-medium leading-[1.4] text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
                                {tag.totalBookmarks} bookmark
                                {tag.totalBookmarks !== 1 ? "s" : ""}
                              </span>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "START_EDIT",
                                    tagId: tag.id,
                                    currentValue: tag.title,
                                  })
                                }
                                disabled={isProcessing}
                                className="p-1 rounded-[var(--radius-4,4px)] text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)] hover:bg-[var(--neutral-200,#e8f0ef)] dark:hover:bg-[var(--neutral-500-dark,#004241)] transition-colors"
                              >
                                <Pencil className="size-4" />
                              </button>
                              <button
                                onClick={() =>
                                  dispatch({
                                    type: "REQUEST_DELETE",
                                    tagId: tag.id,
                                    tagTitle: tag.title,
                                  })
                                }
                                disabled={isProcessing}
                                className={cn(
                                  "p-1 rounded-[var(--radius-4,4px)] transition-colors",
                                  tag.totalBookmarks === 0
                                    ? "text-[var(--red-800,#cb0a04)] dark:text-[var(--red-600,#fd4740)] hover:bg-red-100 dark:hover:bg-red-900/20"
                                    : "text-[var(--neutral-400,#c0cfcc)] dark:text-[var(--neutral-500-dark,#004241)] cursor-not-allowed",
                                )}
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="px-[var(--spacing-300,24px)] py-[var(--spacing-200,16px)] border-t border-[var(--neutral-300,#dde9e7)] dark:border-[var(--neutral-500-dark,#004241)]">
            <p className="text-[12px] font-medium leading-[1.4] text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              Tags with bookmarks cannot be deleted. Remove them from bookmarks
              first.
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {"dialog" in state && (
        <ConfirmationDialog
          open={state.status === "delete_dialog"}
          onOpenChange={(open) => {
            if (!open) dispatch({ type: "CANCEL_DELETE" });
          }}
          title={state.dialog.title}
          description={state.dialog.description}
          confirmText={state.dialog.confirmText}
          cancelText={state.dialog.cancelText}
          variant={state.dialog.variant}
          onConfirm={() => dispatch({ type: "CONFIRM_DELETE" })}
          loading={isProcessing}
        />
      )}
    </>
  );
}

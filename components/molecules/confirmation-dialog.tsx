"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";

export type ConfirmationDialogVariant = "default" | "destructive";

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  variant?: ConfirmationDialogVariant;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

export function ConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmationDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[450px] gap-[var(--spacing-300,24px)] p-[var(--spacing-300,24px)] rounded-[var(--radius-12,12px)]">
        <DialogHeader className="gap-[var(--spacing-100,8px)] text-left">
          <DialogTitle className="text-[24px] font-bold leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-[var(--neutral-0-dark,#ffffff)]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[14px] font-medium leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-300-dark,#00706e)]">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-[var(--spacing-200,16px)] sm:gap-[var(--spacing-200,16px)]">
          <Button
            type="button"
            hierarchy="secondary"
            size="md"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            hierarchy="primary"
            size="md"
            state={variant === "destructive" ? "error" : "default"}
            onClick={handleConfirm}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

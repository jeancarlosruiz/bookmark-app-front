import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/atoms/dialog";
import { IconButton } from "@/components/atoms/icon-button";
import { cn } from "@/lib/utils";

interface DialogContainerProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customCloseBtn?: boolean;
  title: string;
  description: string;
}

const DialogContainer = ({
  children,
  open,
  onOpenChange,
  customCloseBtn = false,
  title,
  description,
}: DialogContainerProps) => {
  const handleCancel = () => {
    onOpenChange?.(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)]",
          "rounded-[var(--corner-radius-16,16px)]",
          "p-[var(--spacing-400,32px)]",
          "gap-[var(--spacing-400,32px)]",
          "max-w-[570px]",
          "border-none shadow-lg",
        )}
        showCloseButton={!customCloseBtn}
      >
        {/* Custom close button */}
        {customCloseBtn && (
          <IconButton
            size="sm"
            variant="default"
            onClick={handleCancel}
            className="absolute right-[20px] top-[20px] bg-white dark:bg-[var(--neutral-600-dark,#002e2d)] border border-[var(--neutral-400,#c0cfcc)] dark:border-[var(--neutral-500-dark,#004241)]"
            aria-label="Close"
          >
            <X className="size-5" />
          </IconButton>
        )}

        {/* Header */}
        <DialogHeader className="gap-[var(--spacing-100,8px)] text-left">
          <DialogTitle className="font-bold text-[24px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="font-medium text-[14px] leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogContainer;

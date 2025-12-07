import * as React from "react";
import { cn } from "@/lib/utils";

export interface DropdownMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  rightSlot?: React.ReactNode;
}

const DropdownMenuItem = React.forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(({ icon, label, rightSlot, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full transition-colors",
        "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
          {icon}
        </div>
      )}
      <p className="flex-1 font-semibold text-[14px] leading-[1.4] text-left text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
        {label}
      </p>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </button>
  );
});

DropdownMenuItem.displayName = "DropdownMenuItem";

export { DropdownMenuItem };

import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/atoms/checkbox";
import { Badge } from "@/components/atoms/badge";

export interface SidebarTagItemProps {
  label: string;
  count: number;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

const SidebarTagItem = React.forwardRef<HTMLDivElement, SidebarTagItemProps>(
  ({ label, count, checked = false, onCheckedChange, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center overflow-hidden px-0 py-[var(--spacing-xxs,2px)] w-full",
          className,
        )}
      >
        <div className="flex-1 flex gap-[var(--spacing-lg,12px)] items-center px-[var(--spacing-lg,12px)] py-[var(--spacing-md,8px)] rounded-[var(--radius-sm,6px)] bg-transparent hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)] transition-colors">
          <div className="flex gap-[var(--spacing-md,8px)] items-center flex-1">
            <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
            <p className="font-semibold text-[16px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
              {label}
            </p>
          </div>
          <Badge>{count}</Badge>
        </div>
      </div>
    );
  },
);

SidebarTagItem.displayName = "SidebarTagItem";

export { SidebarTagItem };

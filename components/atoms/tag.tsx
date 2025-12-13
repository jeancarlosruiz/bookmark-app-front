import * as React from "react";
import { cn } from "@/lib/utils";

export type TagProps = React.HTMLAttributes<HTMLDivElement>;

const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center px-[var(--spacing-md,8px)] py-[var(--spacing-025,2px)] rounded-[var(--radius-4,4px)]",
          "bg-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-600-dark,#002e2d)]",
          "text-center whitespace-nowrap",
          className
        )}
        {...props}
      >
        <span className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
          {children}
        </span>
      </div>
    );
  }
);

Tag.displayName = "Tag";

export { Tag };

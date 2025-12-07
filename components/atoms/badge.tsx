import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center px-[var(--spacing-md,8px)] py-[var(--spacing-xxs,2px)] rounded-[var(--radius-full,9999px)] text-center whitespace-nowrap",
          variant === "default" &&
            "bg-[var(--neutral-100,#e8f0ef)] border border-[var(--neutral-300,#dde9e7)] text-[var(--neutral-800,#4c5c59)] dark:bg-[var(--neutral-600-dark,#002e2d)] dark:border-[var(--neutral-500-dark,#004241)] dark:text-[var(--neutral-100-dark,#b1b9b9)]",
          variant === "outline" &&
            "bg-transparent border border-[var(--neutral-400,#c0cfcc)] text-[var(--neutral-800,#4c5c59)] dark:border-[var(--neutral-500-dark,#004241)] dark:text-[var(--neutral-100-dark,#b1b9b9)]",
          className
        )}
        {...props}
      >
        <span className="font-medium text-[12px] leading-[1.4]">
          {children}
        </span>
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };

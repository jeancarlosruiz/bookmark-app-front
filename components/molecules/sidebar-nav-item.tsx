import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SidebarNavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  className?: string;
}

const SidebarNavItem = React.forwardRef<HTMLAnchorElement, SidebarNavItemProps>(
  ({ href, icon, label, active = false, className }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(
          "flex items-center overflow-hidden px-0 py-[var(--spacing-xxs,2px)] w-full",
          className,
        )}
      >
        <div
          className={cn(
            "flex-1 flex gap-[var(--spacing-lg,12px)] items-center px-[var(--spacing-lg,12px)] py-[var(--spacing-md,8px)] rounded-[var(--radius-sm,6px)] transition-colors",
            active
              ? "bg-[var(--neutral-100,#e8f0ef)] border border-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-600-dark,#002e2d)] dark:border-[var(--neutral-600-dark,#002e2d)]"
              : "bg-transparent hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
          )}
        >
          <div className="flex gap-[var(--spacing-md,8px)] items-center flex-1">
            <div
              className={cn(
                "size-5 shrink-0",
                active
                  ? "text-[var(--neutral-900,#051513)] dark:text-white"
                  : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]",
              )}
            >
              {icon}
            </div>
            <p
              className={cn(
                "font-semibold text-[16px] leading-[1.4] whitespace-nowrap",
                active
                  ? "text-[var(--neutral-900,#051513)] dark:text-white"
                  : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]",
              )}
            >
              {label}
            </p>
          </div>
        </div>
      </Link>
    );
  },
);

SidebarNavItem.displayName = "SidebarNavItem";

export { SidebarNavItem };

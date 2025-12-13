"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = React.forwardRef<HTMLDivElement, ThemeToggleProps>(
  ({ className }, ref) => {
    const { theme, setTheme } = useTheme();

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] flex gap-0 items-center justify-center overflow-hidden p-[var(--spacing-025,2px)] rounded-[4px]",
          className,
        )}
      >
        {/* Light mode button */}
        <button
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center px-[var(--spacing-100,8px)] py-[var(--spacing-075,6px)] rounded-[4px] transition-all duration-300 ease-in-out",
            theme === "light"
              ? "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] scale-105 shadow-sm"
              : "bg-transparent scale-100 hover:bg-white/20 dark:hover:bg-[var(--neutral-800-dark,#001f1f)]/20",
          )}
          aria-label="Light mode"
        >
          <Sun
            className={cn(
              "size-[16px] transition-all duration-300 ease-in-out",
              theme === "light"
                ? "text-[var(--neutral-900,#051513)] dark:text-white rotate-0"
                : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] -rotate-45",
            )}
            strokeWidth={2}
          />
        </button>

        {/* Dark mode button */}
        <button
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center px-[var(--spacing-100,8px)] py-[var(--spacing-075,6px)] rounded-[4px] transition-all duration-300 ease-in-out",
            theme === "dark"
              ? "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] scale-105 shadow-sm"
              : "bg-transparent scale-100 hover:bg-white/20 dark:hover:bg-[var(--neutral-800-dark,#001f1f)]/20",
          )}
          aria-label="Dark mode"
        >
          <Moon
            className={cn(
              "size-[16px] transition-all duration-300 ease-in-out",
              theme === "dark"
                ? "text-[var(--neutral-900,#051513)] dark:text-white rotate-0"
                : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] rotate-90",
            )}
            strokeWidth={2}
          />
        </button>
      </div>
    );
  },
);

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };

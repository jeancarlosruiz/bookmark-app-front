"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  theme?: "light" | "dark";
  onThemeChange?: (theme: "light" | "dark") => void;
  className?: string;
}

const ThemeToggle = React.forwardRef<HTMLDivElement, ThemeToggleProps>(
  ({ theme = "light", onThemeChange, className }, ref) => {
    const handleThemeChange = (newTheme: "light" | "dark") => {
      onThemeChange?.(newTheme);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] flex gap-0 items-center justify-center overflow-hidden p-[var(--spacing-025,2px)] rounded-[4px]",
          className
        )}
      >
        {/* Light mode button */}
        <button
          onClick={() => handleThemeChange("light")}
          className={cn(
            "flex items-center px-[var(--spacing-100,8px)] py-[var(--spacing-075,6px)] rounded-[4px] transition-colors",
            theme === "light"
              ? "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)]"
              : "bg-transparent"
          )}
          aria-label="Light mode"
        >
          <Sun
            className={cn(
              "size-[9.8px]",
              theme === "light"
                ? "text-[var(--neutral-900,#051513)] dark:text-white"
                : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
            )}
            strokeWidth={2}
          />
        </button>

        {/* Dark mode button */}
        <button
          onClick={() => handleThemeChange("dark")}
          className={cn(
            "flex items-center px-[var(--spacing-100,8px)] py-[var(--spacing-075,6px)] rounded-[4px] transition-colors",
            theme === "dark"
              ? "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)]"
              : "bg-transparent"
          )}
          aria-label="Dark mode"
        >
          <Moon
            className={cn(
              "size-[9.8px]",
              theme === "dark"
                ? "text-[var(--neutral-900,#051513)] dark:text-white"
                : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
            )}
            strokeWidth={2}
          />
        </button>
      </div>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";

export { ThemeToggle };

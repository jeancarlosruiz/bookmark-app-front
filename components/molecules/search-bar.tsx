"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useSearch } from "@/lib/hooks/use-search";

export interface SearchBarProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  containerClassName?: string;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, containerClassName, ...props }, ref) => {
    const { search, handleSearchQuery, handleOnKeyDown } = useSearch();

    return (
      <div
        className={cn(
          "flex flex-col gap-[var(--spacing-sm,6px)] w-full max-w-[320px]",
          containerClassName,
        )}
      >
        <div className="bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] border border-[var(--neutral-300,#dde9e7)] dark:border-[var(--neutral-500-dark,#004241)] flex gap-[var(--spacing-100,8px)] items-center p-[var(--spacing-150,12px)] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] w-full">
          <Search className="size-5 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] shrink-0" />
          <input
            ref={ref}
            type="text"
            value={search}
            onChange={handleSearchQuery}
            onKeyDown={handleOnKeyDown}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              "font-medium text-[14px] leading-[1.5] tracking-[0.14px]",
              "text-[var(--neutral-900,#051513)] dark:text-white",
              "placeholder:text-[var(--neutral-800,#4c5c59)] dark:placeholder:text-[var(--neutral-100-dark,#b1b9b9)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              className,
            )}
            placeholder="Search by title..."
            {...props}
          />
        </div>
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";

export { SearchBar };

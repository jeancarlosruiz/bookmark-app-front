"use client";

import { forwardRef } from "react";
import { useQueryState } from "nuqs";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/atoms/dropdown-menu";

// Backend-friendly sort parameter values
export type SortByValue = "created" | "visited" | "count";

export interface SortByDropdownProps {
  trigger?: React.ReactNode;
  className?: string;
}

const sortOptions: { value: SortByValue; label: string }[] = [
  { value: "created", label: "Recently added" },
  { value: "visited", label: "Recently visited" },
  { value: "count", label: "Most visited" },
];

const SortByDropdown = forwardRef<HTMLDivElement, SortByDropdownProps>(
  ({ trigger, className }, ref) => {
    const [currentSort, setCurrentSort] = useQueryState("sort", {
      defaultValue: "created",
    });

    const handleSortChange = (value: SortByValue) => {
      setCurrentSort(value);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>

        <DropdownMenuContent
          ref={ref}
          className={cn(
            "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] border border-[var(--neutral-100,#e8f0ef)] dark:border-[var(--neutral-600-dark,#002e2d)] flex flex-col gap-[var(--spacing-050,4px)] items-start p-[var(--spacing-100,8px)] rounded-[8px] shadow-[0px_6px_14px_0px_rgba(34,38,39,0.1)] w-[200px]",
            className,
          )}
          sideOffset={5}
          align="end"
        >
          {sortOptions.map((option) => {
            const isSelected = currentSort === option.value;
            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={cn(
                  "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full cursor-pointer",
                  "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                  "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
                )}
              >
                <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                  {option.label}
                </span>
                {isSelected && (
                  <Check
                    className="size-[12.8px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                    strokeWidth={2}
                  />
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

SortByDropdown.displayName = "SortByDropdown";

export { SortByDropdown };

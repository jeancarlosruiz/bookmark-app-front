"use client";

import * as React from "react";
import { Plus, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/molecules/search-bar";
import { Button } from "@/components/atoms/button";
import { ProfileDropdown } from "@/components/organisms/profile-dropdown";
import { useSidebar } from "@/components/atoms/sidebar";

export interface AppHeaderProps {
  onAddBookmark?: () => void;
  onSearch?: (query: string) => void;
  className?: string;
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ onAddBookmark, onSearch, className }, ref) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const { toggleSidebar, isMobile } = useSidebar();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      onSearch?.(value);
    };

    return (
      <header
        ref={ref}
        className={cn(
          "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] border-b border-[var(--neutral-300,#dde9e7)] dark:border-[var(--neutral-600-dark,#002e2d)]",
          "flex items-center gap-[var(--spacing-125,10px)] px-[var(--spacing-200,16px)] py-[var(--spacing-150,12px)]",
          "md:px-[var(--spacing-400,32px)] md:py-[var(--spacing-200,16px)]",
          "sticky top-0 z-10 md:relative md:z-auto",
          className,
        )}
      >
        {/* Hamburger Menu Button - Mobile Only */}
        {isMobile && (
          <Button
            hierarchy="secondary"
            size="md"
            onClick={toggleSidebar}
            className="shrink-0 p-[var(--spacing-125,10px)]"
            aria-label="Toggle sidebar"
          >
            <Menu className="size-5" />
          </Button>
        )}

        {/* Search Bar */}
        <div className="flex-1 min-w-0">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            containerClassName="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-[var(--spacing-125,10px)] md:gap-[var(--spacing-200,16px)] items-center shrink-0">
          <Button
            hierarchy="primary"
            size="md"
            onClick={onAddBookmark}
            iconLeading={isMobile ? undefined : <Plus className="size-5" />}
            className={cn(isMobile && "p-[var(--spacing-125,10px)]")}
          >
            {isMobile ? <Plus className="size-5" /> : "Add Bookmark"}
          </Button>

          <ProfileDropdown />
        </div>
      </header>
    );
  },
);

AppHeader.displayName = "AppHeader";

export { AppHeader };

"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/molecules/search-bar";
import { Button } from "@/components/atoms/button";
import { ProfileDropdown } from "@/components/organisms/profile-dropdown";

export interface AppHeaderProps {
  onAddBookmark?: () => void;
  onSearch?: (query: string) => void;
  onLogout?: () => void;
  onThemeChange?: (theme: "light" | "dark") => void;
  userAvatar?: string;
  userName?: string;
  userEmail?: string;
  currentTheme?: "light" | "dark";
  className?: string;
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (
    {
      onAddBookmark,
      onSearch,
      onLogout,
      onThemeChange,
      userAvatar,
      userName = "User",
      userEmail = "user@example.com",
      currentTheme = "light",
      className,
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = React.useState("");

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
          "flex items-center justify-between px-[var(--spacing-400,32px)] py-[var(--spacing-200,16px)]",
          className,
        )}
      >
        <div className="flex gap-4 items-center">
          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            containerClassName="w-full"
          />
        </div>

        <div className="flex gap-[var(--spacing-200,16px)] items-center">
          <Button
            hierarchy="primary"
            size="md"
            onClick={onAddBookmark}
            iconLeading={<Plus className="size-5" />}
          >
            Add Bookmark
          </Button>

          <ProfileDropdown
            userName={userName}
            userEmail={userEmail}
            userAvatar={userAvatar}
            onLogout={onLogout}
            onThemeChange={onThemeChange}
            currentTheme={currentTheme}
          />
        </div>
      </header>
    );
  },
);

AppHeader.displayName = "AppHeader";

export { AppHeader };

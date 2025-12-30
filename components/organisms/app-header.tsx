"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/molecules/search-bar";
import { Button } from "@/components/atoms/button";
import { ProfileDropdown } from "@/components/organisms/profile-dropdown";
import AddBookmarkForm from "./add-bookmark-form";
import MenuButton from "../molecules/menu-button";

export interface AppHeaderProps {
  className?: string;
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ className }, ref) => {
    const [openDialog, setOpenDialog] = React.useState(false);

    return (
      <>
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
          <MenuButton />

          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <SearchBar containerClassName="w-full" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[var(--spacing-125,10px)] md:gap-[var(--spacing-200,16px)] items-center shrink-0">
            {/* Add Bookmark Button - Icon only on mobile/tablet, icon + text on desktop */}
            <Button
              hierarchy="primary"
              size="md"
              onClick={() => setOpenDialog(true)}
              className="p-[var(--spacing-125,10px)] lg:px-4 lg:py-2"
              aria-label="Add bookmark"
            >
              <Plus className="size-5" />
              <span className="hidden lg:inline lg:ml-2">Add Bookmark</span>
            </Button>

            <ProfileDropdown />
          </div>
        </header>

        <AddBookmarkForm
          dialogOpen={openDialog}
          setDialogOpen={setOpenDialog}
        />
      </>
    );
  },
);

AppHeader.displayName = "AppHeader";

export { AppHeader };

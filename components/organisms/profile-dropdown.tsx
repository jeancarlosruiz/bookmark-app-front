"use client";

import * as React from "react";
import { Palette, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/atoms/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";
import { ProfileDropdownHeader } from "@/components/molecules/profile-dropdown-header";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { useUser } from "@stackframe/stack";

export interface ProfileDropdownProps {
  userName: string;
  userEmail: string;
  userAvatar?: string;
  currentTheme?: "light" | "dark";
  className?: string;
}

const ProfileDropdown = React.forwardRef<HTMLDivElement, ProfileDropdownProps>(
  ({ userName, userEmail, userAvatar, className }, ref) => {
    const user = useUser();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer outline-none focus:outline-none">
            <Avatar className="size-10">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback className="bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] font-semibold text-[14px]">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          ref={ref}
          className={cn(
            "bg-white dark:bg-[var(--neutral-800-dark,#001f1f)] border border-[var(--neutral-100,#e8f0ef)] dark:border-[var(--neutral-600-dark,#002e2d)] flex flex-col gap-[var(--spacing-050,4px)] items-start overflow-hidden rounded-[8px] shadow-[0px_6px_14px_0px_rgba(34,38,39,0.1)] w-[248px] p-0",
            className,
          )}
          sideOffset={5}
          align="end"
        >
          {/* Header */}
          <ProfileDropdownHeader
            name={userName}
            email={userEmail}
            avatar={userAvatar}
          />

          {/* Menu items */}
          <div className="flex flex-col items-start px-[var(--spacing-100,8px)] py-[var(--spacing-xs,4px)] w-full">
            <DropdownMenuItem
              className={cn(
                "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
                "cursor-default",
              )}
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <Palette
                className="size-[16px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                strokeWidth={2}
              />
              <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-left text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Theme
              </span>
              <ThemeToggle />
            </DropdownMenuItem>
          </div>

          {/* Separator */}
          <DropdownMenuSeparator className="bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] h-px w-full mx-0 my-0" />

          {/* Footer */}
          <div className="flex flex-col items-start px-[var(--spacing-100,8px)] py-[var(--spacing-050,4px)] w-full">
            <DropdownMenuItem
              className={cn(
                "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
              )}
              onClick={() => user?.signOut()}
            >
              <LogOut
                className="size-[16px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                strokeWidth={2}
              />
              <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-left text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Logout
              </span>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

ProfileDropdown.displayName = "ProfileDropdown";

export { ProfileDropdown };

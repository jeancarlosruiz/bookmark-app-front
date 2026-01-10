"use client";

import * as React from "react";
import { Palette, LogOut, Link2 } from "lucide-react";
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
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth/better-auth-client";
import { useRouter } from "next/navigation";

export interface InitialUserData {
  name: string | null;
  email: string | null;
  image: string | null;
  isAnonymous: boolean;
}

export interface ProfileDropdownProps {
  className?: string;
  initialUser?: InitialUserData | null;
}

const ProfileDropdown = React.forwardRef<HTMLDivElement, ProfileDropdownProps>(
  ({ className, initialUser }, ref) => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    // Use server-provided data initially, then sync with client session
    const user = session?.user ?? initialUser;

    // Usuario autenticado = existe usuario Y NO es anónimo
    const isAuthenticated = !!user && !user.isAnonymous;

    const handleSignout = async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    };

    // Only show loading if we have no initial data AND session is pending
    if (isPending && !initialUser) {
      return (
        <div className="size-10 rounded-full bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] animate-pulse" />
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="cursor-pointer outline-none focus:outline-none">
            <Avatar className="size-10">
              <AvatarImage
                src={user?.image ?? ""}
                alt={user?.name ?? "User"}
              />
              <AvatarFallback className="bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] font-semibold text-[14px]">
                {user?.name?.charAt(0).toUpperCase() ?? "U"}
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
            name={user?.name ?? "Guest"}
            email={user?.email ?? ""}
            avatar={user?.image ?? ""}
            isAnonymous={!!user?.isAnonymous}
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
            {!isAuthenticated && (
              <DropdownMenuItem
                asChild
                className={cn(
                  "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                  "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                  "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
                )}
              >
                <Link href="/signin" className="flex gap-[var(--spacing-125,10px)] items-center w-full">
                  <Link2
                    className="size-[16px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                    strokeWidth={2}
                  />
                  <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-left text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                    Link Account
                  </span>
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className={cn(
                "flex gap-[var(--spacing-125,10px)] items-center p-[var(--spacing-100,8px)] rounded-[6px] w-full",
                "hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
                "focus:bg-[var(--neutral-100,#e8f0ef)] dark:focus:bg-[var(--neutral-600-dark,#002e2d)]",
              )}
              onClick={handleSignout}
            >
              <LogOut
                className="size-[16px] shrink-0 text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
                strokeWidth={2}
              />
              <span className="flex-1 font-semibold text-[14px] leading-[1.4] text-left text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Sign Out
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

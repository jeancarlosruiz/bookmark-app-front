import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";

export interface ProfileDropdownHeaderProps {
  name: string;
  email: string;
  avatar?: string;
  className?: string;
}

const ProfileDropdownHeader = React.forwardRef<
  HTMLDivElement,
  ProfileDropdownHeaderProps
>(({ name, email, avatar, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "border-b border-[var(--neutral-300,#dde9e7)] dark:border-[var(--neutral-600-dark,#002e2d)] flex flex-col items-start px-[var(--spacing-xl,16px)] py-[var(--spacing-lg,12px)] w-full",
        className,
      )}
    >
      <div className="flex gap-[var(--spacing-lg,12px)] items-center w-full">
        <Avatar className="size-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback className="bg-[var(--neutral-300,#dde9e7)] dark:bg-[var(--neutral-600-dark,#002e2d)] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] font-semibold text-[14px]">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col items-start min-w-0">
          <p className="font-semibold text-[14px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white w-full truncate">
            {name}
          </p>
          <p className="font-medium text-[14px] leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] w-full truncate">
            {email}
          </p>
        </div>
      </div>
    </div>
  );
});

ProfileDropdownHeader.displayName = "ProfileDropdownHeader";

export { ProfileDropdownHeader };

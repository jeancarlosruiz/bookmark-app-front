import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BookmarkCardHeaderProps {
  logo?: string;
  title: string;
  url: string;
  className?: string;
}

const BookmarkCardHeader = React.forwardRef<
  HTMLDivElement,
  BookmarkCardHeaderProps
>(({ logo, title, url, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-[var(--spacing-150,12px)] items-start flex-1",
        className,
      )}
    >
      {/* Logo */}
      <div className="relative size-[44px] border border-[var(--neutral-100,#e8f0ef)] dark:border-[var(--neutral-600-dark,#002e2d)] rounded-[8px] overflow-hidden shrink-0">
        {logo ? (
          <Image src={logo} alt={title} fill className="object-cover" />
        ) : (
          <div className="size-full bg-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-600-dark,#002e2d)] flex items-center justify-center">
            <span className="font-bold text-[16px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-[var(--spacing-050,4px)] min-w-0">
        <h3 className="font-bold text-[20px] leading-[1.2] text-[var(--neutral-900,#051513)] dark:text-white truncate max-w-[20ch]">
          {title}
        </h3>
        <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap truncate max-w-[30ch]">
          {url}
        </p>
      </div>
    </div>
  );
});

BookmarkCardHeader.displayName = "BookmarkCardHeader";

export { BookmarkCardHeader };

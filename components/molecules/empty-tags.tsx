import * as React from "react";
import { Tags } from "lucide-react";

export interface EmptyTagsProps {
  className?: string;
}

const EmptyTags = React.forwardRef<HTMLDivElement, EmptyTagsProps>(
  ({ className }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center py-[var(--spacing-600,48px)] px-[var(--spacing-200,16px)] ${className || ""}`}
      >
        {/* Icon */}
        <div className="flex items-center justify-center w-16 h-16 mb-[var(--spacing-200,16px)] rounded-full bg-[var(--neutral-200,#e8f0ef)] dark:bg-[var(--neutral-600-dark,#002e2d)]">
          <Tags className="w-8 h-8 text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-500-dark,#004241)]" />
        </div>

        {/* Message */}
        <p className="text-[14px] font-medium leading-[1.5] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] text-center">
          No tags yet
        </p>
        <p className="text-[12px] font-normal leading-[1.4] text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-500-dark,#004241)] text-center mt-[var(--spacing-100,8px)]">
          Tags will appear here when you add them to your bookmarks
        </p>
      </div>
    );
  },
);

EmptyTags.displayName = "EmptyTags";

export { EmptyTags };

import * as React from "react";
import { Eye, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookmarkCardFooterProps {
  views: number;
  time: string | null;
  date: string;
  className?: string;
}

const BookmarkCardFooter = React.forwardRef<
  HTMLDivElement,
  BookmarkCardFooterProps
>(({ views, time, date, className }, ref) => {
  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  // Calculate time since last visit
  const getTimeSinceVisit = (dateString: string | null) => {
    if (!dateString) return "Never";
    const now = new Date();
    const visitDate = new Date(dateString);
    const diffMs = now.getTime() - visitDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hr ago`;
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  const currentDate = formatDate(date);
  const lastTimeVisited = getTimeSinceVisit(time);

  return (
    <div
      ref={ref}
      className={cn(
        "flex gap-[var(--spacing-200,16px)] items-center",
        className,
      )}
    >
      {/* Views */}
      <div className="flex gap-[var(--spacing-075,6px)] items-center">
        <Eye
          className="size-[12px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
          strokeWidth={2}
        />
        <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
          {views}
        </p>
      </div>

      {/* Time */}
      <div className="flex gap-[var(--spacing-075,6px)] items-center">
        <Clock
          className="size-[12px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
          strokeWidth={2}
        />
        <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
          {lastTimeVisited}
        </p>
      </div>

      {/* Date */}
      <div className="flex gap-[var(--spacing-075,6px)] items-center">
        <Calendar
          className="size-[12px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
          strokeWidth={2}
        />
        <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
          {currentDate}
        </p>
      </div>
    </div>
  );
});

BookmarkCardFooter.displayName = "BookmarkCardFooter";

export { BookmarkCardFooter };

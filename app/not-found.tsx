import Link from "next/link";
import { Home, FileQuestion } from "lucide-react";
import { buttonVariants } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-900-dark,#001414)] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-[var(--teal-700,#014745)] opacity-10 dark:opacity-20 blur-3xl rounded-full" />
            <FileQuestion className="size-24 text-[var(--neutral-600,#4c5c59)] dark:text-[var(--neutral-400-dark,#00615f)] relative" />
          </div>
        </div>

        {/* Error Code */}
        <div className="space-y-2">
          <h1 className="font-bold text-[64px] leading-none text-[var(--neutral-900,#051513)] dark:text-white">
            404
          </h1>
          <p className="font-semibold text-[20px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
            Page not found
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            href="/"
            className={cn(
              buttonVariants({ hierarchy: "primary", size: "md" }),
              "no-underline",
            )}
          >
            <span className="shrink-0 size-5 flex items-center justify-center">
              <Home className="size-5" />
            </span>
            <span className="px-[var(--spacing-xxs,2px)]">Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

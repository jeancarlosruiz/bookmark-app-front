import { AppLogo } from "@/components/atoms/app-logo";

export default function ResetPasswordLoading() {
  return (
    <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col gap-[var(--spacing-400,32px)] px-[var(--spacing-400,32px)] py-[var(--spacing-500,40px)] rounded-[var(--radius-12,12px)] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full max-w-[448px]">
      <AppLogo />

      <div className="flex flex-col gap-[var(--spacing-300,24px)] w-full">
        <div className="flex flex-col gap-[var(--spacing-100,8px)]">
          <div className="h-8 bg-[var(--neutral-300)] dark:bg-[var(--neutral-600-dark)] rounded animate-pulse w-3/4" />
          <div className="h-5 bg-[var(--neutral-300)] dark:bg-[var(--neutral-600-dark)] rounded animate-pulse w-full" />
        </div>

        <div className="flex flex-col gap-[var(--spacing-200,16px)]">
          <div className="h-12 bg-[var(--neutral-300)] dark:bg-[var(--neutral-600-dark)] rounded animate-pulse" />
          <div className="h-12 bg-[var(--neutral-300)] dark:bg-[var(--neutral-600-dark)] rounded animate-pulse" />
          <div className="h-12 bg-[var(--neutral-300)] dark:bg-[var(--neutral-600-dark)] rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

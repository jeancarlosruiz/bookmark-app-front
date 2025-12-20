import { Suspense } from "react";
import ResetPasswordForm from "@/components/organisms/reset-password-form";

function ResetPasswordContent() {
  return <ResetPasswordForm />;
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-900-dark,#001414)] flex items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col gap-[var(--spacing-400,32px)] px-[var(--spacing-400,32px)] py-[var(--spacing-500,40px)] rounded-[var(--radius-12,12px)] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full max-w-[448px]">
            <div className="animate-pulse">Loading...</div>
          </div>
        }
      >
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}

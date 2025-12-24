"use client";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md text-center">
      <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] p-8 rounded-[var(--radius-12,12px)] shadow-lg">
        <h2 className="text-2xl font-bold text-[var(--neutral-900,#051513)] dark:text-white mb-4">
          Authentication Error
        </h2>
        <p className="text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)] mb-6">
          {error.message || "An error occurred during authentication."}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-[var(--teal-700,#014745)] text-white rounded-lg hover:bg-[var(--teal-800,#013c3b)] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

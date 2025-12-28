"use client";

export default function DashboardError() {
  return (
    <section className="p-[var(--spacing-200,16px)] md:px-[32px] md:py-[var(--spacing-400,32px)] flex flex-col gap-5 md:pt-[var(--spacing-400,32px)]">
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-[var(--neutral-900,#051513)] dark:text-white mb-4">
            Something went wrong!
          </h2>
          <p className="text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)] mb-6">
            {"An error occurred while loading the dashboard."}
          </p>

          {/*  Hacer  que recargue la pagina */}
          <button className="px-4 py-2 bg-[var(--teal-700,#014745)] text-white rounded-lg hover:bg-[var(--teal-800,#013c3b)] transition-colors">
            Try again
          </button>
        </div>
      </div>
    </section>
  );
}

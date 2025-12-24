import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-900-dark,#001414)] flex items-center justify-center p-4">
      {children}
    </main>
  );
}

"use client";

import { LoginForm } from "@/components/organisms/login-form";

export default function Page() {
  return (
    <div className="min-h-screen bg-[var(--neutral-100,#e8f0ef)] dark:bg-[var(--neutral-900-dark,#001414)] flex items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}

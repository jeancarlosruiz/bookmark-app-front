"use client";

import { useState } from "react";
import Link from "next/link";
import { useStackApp } from "@stackframe/stack";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import BookmarkLogo from "@/components/atoms/logo";

export default function ForgotPasswordPage() {
  const app = useStackApp();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setMessage("");

    try {
      await app.sendForgotPasswordEmail(email);
      setMessage("Reset link sent! Check your email.");
      setEmail("");
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--neutral-200)]">
      <div className="w-full max-w-[448px] rounded-[12px] bg-[var(--neutral-0)] px-[32px] py-[40px] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)]">
        {/* Logo */}
        <div className="mb-[32px] scale-[0.9] origin-left">
          <BookmarkLogo />
        </div>

        {/* Form Header */}
        <div className="mb-[32px] flex flex-col gap-[6px]">
          <h1 className="text-[24px] font-bold leading-[1.4] text-[var(--neutral-900)]">
            Forgot your password?
          </h1>
          <p className="text-[14px] font-medium leading-[1.5] tracking-[0.14px] text-[var(--neutral-800)]">
            Enter your email address below and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-[32px] flex flex-col gap-[16px]">
          {/* Email Input */}
          <div className="flex flex-col gap-[6px]">
            <div className="flex items-start gap-[2px]">
              <label htmlFor="email" className="text-[14px] font-semibold leading-[1.4] text-[var(--neutral-900)]">
                Email
              </label>
              <span className="text-[14px] font-medium leading-[20px] text-[var(--teal-700)]">*</span>
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              className="w-full"
              placeholder="your@email.com"
            />
          </div>

          {/* Messages */}
          {message && (
            <p className="text-[14px] text-[var(--teal-700)]">{message}</p>
          )}
          {error && (
            <p className="text-[14px] text-[var(--red-600)]">{error}</p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full border-2 border-[rgba(255,255,255,0.12)] bg-[var(--teal-700)] px-[16px] py-[12px] text-[16px] font-semibold leading-[1.4] text-[var(--neutral-0)] shadow-[0px_0px_0px_1px_inset_rgba(34,38,39,0.12)] hover:bg-[var(--teal-800)]"
          >
            {isSubmitting ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        {/* Form Footer */}
        <div className="flex w-full items-center justify-center">
          <Link
            href="/signin"
            className="text-[14px] font-semibold leading-[1.4] text-[var(--neutral-900)] hover:text-[var(--teal-700)]"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

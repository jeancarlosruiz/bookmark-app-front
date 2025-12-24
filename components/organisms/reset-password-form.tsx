"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormHeader } from "@/components/molecules/form-header";
import { AppLogo } from "@/components/atoms/app-logo";
import { useActionState } from "react";
import { resetPassword, RESET_PASSWORD_FORM_STATE } from "@/actions/auth";
import { useRouter, useSearchParams } from "next/navigation";

const initialState: RESET_PASSWORD_FORM_STATE = {
  status: "idle",
  errors: null,
  fields: {
    password: "",
    confirmPassword: "",
  },
};

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const generalError = state.errors?.general;

  // Redirect to sign in after successful password reset
  React.useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/signin");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  // Show error if no token
  if (!token) {
    return (
      <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col gap-[var(--spacing-400,32px)] px-[var(--spacing-400,32px)] py-[var(--spacing-500,40px)] rounded-[var(--radius-12,12px)] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full max-w-[448px]">
        <AppLogo />
        <div className="flex flex-col gap-[var(--spacing-300,24px)] text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[var(--red-600,#fd4740)] rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <FormHeader
            title="Invalid reset link"
            subtitle="This password reset link is invalid or has expired. Please request a new one."
            className="text-center"
          />
          <Link href="/forgot-password" className="w-full">
            <Button hierarchy="primary" size="md" className="w-full">
              Request new link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col gap-[var(--spacing-400,32px)] px-[var(--spacing-400,32px)] py-[var(--spacing-500,40px)] rounded-[var(--radius-12,12px)] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full max-w-[448px]">
      {/* Logo */}
      <AppLogo />

      {isSuccess ? (
        // Success State
        <div className="flex flex-col gap-[var(--spacing-300,24px)] w-full">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-[var(--teal-700,#014745)] dark:bg-[var(--teal-700,#014745)] rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Form Header */}
          <FormHeader
            title="Password reset successful!"
            subtitle="Your password has been successfully reset. You can now sign in with your new password."
            className="text-center"
          />

          {/* Redirect message */}
          <p className="text-center text-sm font-medium text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
            Redirecting to sign in...
          </p>

          {/* Sign In Link */}
          <Link href="/signin" className="w-full">
            <Button hierarchy="primary" size="md" className="w-full">
              Sign in now
            </Button>
          </Link>
        </div>
      ) : (
        // Form State
        <>
          {/* Form Header */}
          <FormHeader
            title="Set new password"
            subtitle="Your new password must be different from previously used passwords."
          />

          {/* Form Fields */}
          <form
            action={formAction}
            className="flex flex-col gap-[var(--spacing-200,16px)] w-full"
          >
            {/* Hidden token field */}
            <input type="hidden" name="token" value={token} />

            <Input
              label="New password"
              type="password"
              name="password"
              placeholder="Enter your new password"
              required
              defaultValue={state.fields?.password}
              error={isError && state.errors?.password}
              hintText={
                state.errors?.password || "Must be at least 8 characters"
              }
            />

            <Input
              label="Confirm password"
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your new password"
              required
              defaultValue={state.fields?.confirmPassword}
              error={isError && state.errors?.confirmPassword}
              hintText={state.errors?.confirmPassword}
            />

            {generalError && (
              <p className="text-[var(--red-600,#fd4740)] text-sm font-medium">
                {generalError}
              </p>
            )}

            <Button
              type="submit"
              hierarchy="primary"
              size="md"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Resetting password..." : "Reset password"}
            </Button>
          </form>

          {/* Form Footer */}
          <div className="flex gap-[var(--spacing-sm,6px)] items-baseline justify-center text-[14px]">
            <Link
              href="/signin"
              className="flex gap-[var(--spacing-sm,6px)] items-center font-semibold leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white hover:underline"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to sign in
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

ResetPasswordForm.displayName = "ResetPasswordForm";

export default ResetPasswordForm;

"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormHeader } from "@/components/molecules/form-header";
import { AppLogo } from "@/components/atoms/app-logo";
import { useActionState } from "react";
import {
  forgotPassword,
  FORGOT_PASSWORD_FORM_STATE,
} from "@/actions/auth";

const initialState: FORGOT_PASSWORD_FORM_STATE = {
  status: "idle",
  errors: null,
  fields: {
    email: "",
  },
};

const ForgotPasswordForm = () => {
  const [state, formAction, isPending] = useActionState(
    forgotPassword,
    initialState
  );
  const isError = state.status === "error";
  const isSuccess = state.status === "success";
  const generalError = state.errors?.general;

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
            title="Check your email"
            subtitle="We've sent a password reset link to your email address. Click the link to reset your password."
            className="text-center"
          />

          {/* Back to Sign In Link */}
          <div className="flex flex-col gap-[var(--spacing-200,16px)] w-full">
            <Link href="/signin" className="w-full">
              <Button hierarchy="primary" size="md" className="w-full">
                Back to sign in
              </Button>
            </Link>

            <div className="flex gap-[var(--spacing-sm,6px)] items-baseline justify-center text-[14px]">
              <p className="font-medium leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                Didn&apos;t receive the email?
              </p>
              <button
                onClick={() => window.location.reload()}
                className="font-semibold leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Form State
        <>
          {/* Form Header */}
          <FormHeader
            title="Forgot password?"
            subtitle="No worries, we'll send you reset instructions."
          />

          {/* Form Fields */}
          <form
            action={formAction}
            className="flex flex-col gap-[var(--spacing-200,16px)] w-full"
          >
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              defaultValue={state.fields?.email}
              error={isError && state.errors?.email}
              hintText={state.errors?.email}
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
              {isPending ? "Sending..." : "Reset password"}
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

ForgotPasswordForm.displayName = "ForgotPasswordForm";

export default ForgotPasswordForm;

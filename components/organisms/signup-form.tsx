"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormHeader } from "@/components/molecules/form-header";
import { AppLogo } from "@/components/atoms/app-logo";
import { useActionState } from "react";
import { signup, SIGNUP_FORM_STATE } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { signInGoogleClient } from "@/lib/auth/better-auth-client";
import { toast } from "sonner";
import { useMigrationNotification } from "@/lib/hooks/use-migration-notification";
import {
  getSafeErrorMessage,
  logAuthError,
} from "@/lib/utils/auth-error-handler";

const initialState: SIGNUP_FORM_STATE = {
  status: "idle",
  errors: null,
  fields: {
    name: "",
    email: "",
    password: "",
  },
};

const SignupForm = () => {
  const [state, formAction, isPending] = useActionState(signup, initialState);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const isError = state.status === "error";
  const generalError = state.errors?.general;
  const router = useRouter();

  // Check for migration notifications (success)
  useMigrationNotification();

  React.useEffect(() => {
    if (state.status === "success") {
      router.push("/signin");
    }
  }, [state, router]);

  return (
    <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col gap-[var(--spacing-400,32px)] px-[var(--spacing-400,32px)] py-[var(--spacing-500,40px)] rounded-[var(--radius-12,12px)] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full max-w-[448px]">
      {/* Logo */}
      <AppLogo />

      {/* Form Header */}
      <FormHeader
        title="Create your account"
        subtitle="Join us and start saving your favorite links — organized, searchable, and always within reach."
      />

      {/* Form Fields */}
      <form
        action={formAction}
        className="flex flex-col gap-[var(--spacing-200,16px)] w-full"
      >
        <Input
          label="Name"
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          defaultValue={state.fields?.name}
          error={isError && state.errors?.name}
          hintText={state.errors?.name}
        />

        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          defaultValue={state.fields?.email}
          error={isError && state.errors?.email}
          hintText={state.errors?.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          defaultValue={state.fields?.password}
          error={isError && state.errors?.password}
          hintText={state.errors?.password}
        />

        {generalError && (
          <p className="text-red-600 text-sm font-medium">{generalError}</p>
        )}

        <Button type="submit" hierarchy="primary" size="md" className="w-full">
          {isPending ? "Creating account..." : "Create account"}
        </Button>

        <Button
          type="button"
          hierarchy="secondary"
          size="md"
          className="w-full gap-[12px]"
          onClick={async () => {
            setIsGoogleLoading(true);
            try {
              await signInGoogleClient();
              // If successful, redirect to home - migration notification will show there
              router.push("/");
            } catch (error: unknown) {
              setIsGoogleLoading(false);

              // Get sanitized error message safe for users
              const safeErrorMessage = getSafeErrorMessage(
                error,
                "google_signin",
              );
              toast.error(safeErrorMessage);

              // Log detailed error for debugging (dev only)
              logAuthError(error, "Signup - Google Sign-in");
            }
          }}
          disabled={isGoogleLoading || isPending}
          iconLeading={
            <svg
              width="20"
              height="20"
              viewBox="-3 0 262 262"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              />
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              />
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              />
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              />
            </svg>
          }
        >
          {isGoogleLoading ? "Signing in..." : "Sign In with Google"}
        </Button>
      </form>

      {/* Form Footer */}
      <div className="flex flex-col items-start w-full">
        <div className="flex gap-[var(--spacing-sm,6px)] items-baseline justify-center text-[14px] whitespace-pre w-full">
          <p className="font-medium leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
            Already have an account?
          </p>
          <Link
            href="/signin"
            className="font-semibold leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

SignupForm.displayName = "SignupForm";

export default SignupForm;

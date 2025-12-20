"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormHeader } from "@/components/molecules/form-header";
import { AppLogo } from "@/components/atoms/app-logo";
import { useActionState } from "react";
import { login, SIGNIN_FORM_STATE } from "@/actions/auth";
import { useRouter } from "next/navigation";

const initialState: SIGNIN_FORM_STATE = {
  status: "idle",
  errors: null,
  fields: {
    email: "",
    password: "",
  },
};

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const isError = state.status === "error";
  const generalError = state.errors?.general;
  const router = useRouter();

  React.useEffect(() => {
    if (state.status === "success") {
      router.push("/");
    }
  });

  return (
    <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col gap-[var(--spacing-400,32px)] px-[var(--spacing-400,32px)] py-[var(--spacing-500,40px)] rounded-[var(--radius-12,12px)] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full max-w-[448px]">
      {/* Logo */}
      <AppLogo />

      {/* Form Header */}
      <FormHeader
        title="Log in to your account"
        subtitle="Welcome back! Please enter your details."
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

        <Input
          label="Password"
          type="password"
          name="password"
          defaultValue={state.fields?.password}
          placeholder="Enter your password"
          required
          error={isError && state.errors?.password}
          hintText={state.errors?.password}
        />

        {generalError && (
          <p className="text-red-600 text-sm font-medium">{generalError}</p>
        )}

        <Button type="submit" hierarchy="primary" size="md" className="w-full">
          {isPending ? "Logging in..." : "Log in"}
        </Button>
      </form>

      {/* Form Footer */}
      <div className="flex flex-col gap-[12px] w-full">
        <div className="flex gap-[var(--spacing-sm,6px)] items-baseline justify-center text-[14px] whitespace-pre">
          <p className="font-medium leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
            Forgot password?
          </p>
          <Link
            href="/forgot-password"
            className="font-semibold leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white hover:underline"
          >
            Reset it
          </Link>
        </div>

        <div className="flex gap-[var(--spacing-sm,6px)] items-baseline justify-center text-[14px] whitespace-pre">
          <p className="font-medium leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
            Don&apos;t have an account?
          </p>
          <Link
            href="/signup"
            className="font-semibold leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

LoginForm.displayName = "LoginForm";

export default LoginForm;

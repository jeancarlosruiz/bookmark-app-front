"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { FormHeader } from "@/components/molecules/form-header";
import { useActionState } from "react";
import { signup, SIGNUP_FORM_STATE } from "@/actions/auth";

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
  const isError = state.status === "error";

  return (
    <div className="bg-[var(--neutral-0,#ffffff)] dark:bg-[var(--neutral-800-dark,#001f1f)] flex flex-col gap-[var(--spacing-400,32px)] px-[var(--spacing-400,32px)] py-[var(--spacing-500,40px)] rounded-[var(--radius-12,12px)] shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)] w-full max-w-[448px]">
      {/* Logo */}
      <div className="flex gap-[8px] items-center">
        <div className="relative w-8 h-8 overflow-hidden shrink-0">
          <div className="absolute bg-white h-[23px] left-1/2 top-[calc(50%+0.5px)] -translate-x-1/2 -translate-y-1/2 w-[18px]" />
          <svg
            className="absolute inset-[1.28%]"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
          >
            <path
              fill="var(--teal-700,#014745)"
              d="M11.735 11.757c0-.442 0-1.363 2.014-1.363h4.496c2.012 0 2.012.934 2.012 1.494l.003 9.316-3.636-2.056a1.23 1.23 0 0 0-1.206-.002l-3.683 2.064z"
            />
            <path
              fill="var(--teal-700,#014745)"
              fillRule="evenodd"
              d="M22.919 31.59H9.078C3.892 31.59.41 27.945.41 22.522V9.479C.41 4.055 3.892.41 9.078.41H22.92c5.186 0 8.67 3.645 8.67 9.069v13.043c0 5.423-3.486 9.068-8.671 9.068M9.275 22.166a1.904 1.904 0 0 0 2.832 1.659l3.91-2.193 3.873 2.19a1.907 1.907 0 0 0 2.593-.734 1.9 1.9 0 0 0 .24-.926l-.004-10.274c0-2.477-1.672-3.955-4.473-3.955H13.75c-2.76 0-4.475 1.465-4.475 3.824z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <p className="font-bold text-[20px] leading-none tracking-[-0.2px] text-[var(--neutral-900,#051513)] dark:text-white whitespace-nowrap">
          Bookmark Manager
        </p>
      </div>

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
          label="Full name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          required
          error={isError && state.errors?.name}
          hintText={state.errors?.name}
        />

        <Input
          label="Email address"
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          error={isError && state.errors?.email}
          hintText={state.errors?.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          error={isError && state.errors?.password}
          hintText={state.errors?.password}
        />

        <Button type="submit" hierarchy="primary" size="md" className="w-full">
          {isPending ? "Creating account..." : "Create account"}
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

export { SignupForm };

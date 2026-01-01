import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  hintText?: string;
  error?: string | boolean;
  iconLeading?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      required,
      hintText,
      error,
      iconLeading,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const isError = !!error;
    const errorMessage = typeof error === "string" ? error : hintText;

    return (
      <div className="flex flex-col gap-[var(--spacing-sm,6px)] w-full">
        {/* Input with label wrapper */}
        <div className="flex flex-col gap-[var(--spacing-sm,6px)] w-full">
          {/* Label */}
          {label && (
            <label
              htmlFor={inputId}
              className="flex gap-[var(--spacing-xxs,2px)] items-start"
            >
              <span className="font-semibold text-[14px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
                {label}
              </span>
              {required && (
                <span className="font-medium text-[14px] leading-[20px] text-[var(--teal-700,#014745)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                  *
                </span>
              )}
            </label>
          )}

          {/* Input container */}
          <div
            className={cn(
              "relative flex items-center gap-[var(--spacing-100,8px)] px-[var(--spacing-150,12px)] py-[var(--spacing-150,12px)] rounded-[var(--radius-8,8px)] border transition-all w-full",
              // Light mode default
              "bg-white border-[var(--neutral-500,#899492)]",
              // Light mode hover
              "hover:bg-[var(--neutral-100,#e8f0ef)]",
              // Light mode focus - ring effect from Figma
              "focus-within:bg-white focus-within:border-[var(--neutral-300,#dde9e7)] focus-within:shadow-[0px_0px_0px_2px_white,0px_0px_0px_4px_var(--teal-700,#014745),inset_0px_0px_0px_1px_rgba(10,13,18,0.18)]",
              // Dark mode default
              "dark:bg-[var(--neutral-600-dark,#002e2d)] dark:border-[var(--neutral-500-dark,#004241)]",
              // Dark mode hover
              "dark:hover:bg-[var(--neutral-500-dark,#004241)] dark:hover:border-[var(--neutral-400-dark,#004746)]",
              // Dark mode focus - ring effect from Figma
              "dark:focus-within:bg-[var(--neutral-600-dark,#002e2d)] dark:focus-within:border-[var(--neutral-500-dark,#004241)] dark:focus-within:shadow-[0px_0px_0px_2px_var(--neutral-800-dark,#001f1f),0px_0px_0px_4px_var(--neutral-100-dark,#b1b9b9),inset_0px_0px_0px_1px_rgba(10,13,18,0.18)]",
              // Error state
              isError &&
                "border-[var(--red-800,#cb0a04)] hover:border-[var(--red-800,#cb0a04)] focus-within:border-[var(--red-800,#cb0a04)] dark:border-[var(--red-600,#fd4740)] dark:hover:border-[var(--red-600,#fd4740)] dark:focus-within:border-[var(--red-600,#fd4740)] focus-within:shadow-none dark:focus-within:shadow-none",
              className
            )}
          >
            {/* Leading icon */}
            {iconLeading && (
              <div className="shrink-0 size-5 flex items-center justify-center text-[var(--neutral-800,#4c5659)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
                {iconLeading}
              </div>
            )}

            {/* Input field */}
            <input
              ref={ref}
              type={type}
              id={inputId}
              className={cn(
                "flex-1 min-w-0 bg-transparent outline-none",
                "font-medium text-[14px] leading-[1.5] tracking-[0.14px]",
                "text-[var(--neutral-900,#051513)] dark:text-white",
                "placeholder:text-[var(--neutral-800,#4c5c59)] dark:placeholder:text-[var(--neutral-100-dark,#b1b9b9)]",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
              aria-invalid={isError}
              aria-describedby={
                errorMessage ? `${inputId}-hint` : undefined
              }
              {...props}
            />
          </div>
        </div>

        {/* Hint text or error message */}
        {errorMessage && (
          <p
            id={`${inputId}-hint`}
            className={cn(
              "font-medium text-[14px] leading-[1.5] tracking-[0.14px]",
              isError
                ? "text-[var(--red-800,#cb0a04)] dark:text-[var(--red-600,#fd4740)]"
                : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
            )}
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

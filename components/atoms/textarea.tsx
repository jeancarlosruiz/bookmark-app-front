import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  hintText?: string;
  error?: string | boolean;
  showCharCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      required,
      hintText,
      error,
      showCharCount = false,
      maxLength,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const isError = !!error;
    const errorMessage = typeof error === "string" ? error : hintText;
    const charCount = typeof value === "string" ? value.length : 0;

    return (
      <div className="flex flex-col gap-[var(--spacing-sm,6px)] w-full">
        {/* Textarea with label wrapper */}
        <div className="flex flex-col gap-[var(--spacing-sm,6px)] w-full h-full">
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

          {/* Textarea container */}
          <div
            className={cn(
              "relative flex flex-1 items-start gap-[var(--spacing-100,8px)] px-[var(--spacing-150,12px)] py-[var(--spacing-150,12px)] rounded-[8px] border transition-all w-full min-h-[100px]",
              // Light mode default
              "bg-white border-[var(--neutral-500,#899492)]",
              // Light mode hover
              "hover:bg-[var(--neutral-100,#e8f0ef)]",
              // Light mode focus
              "focus-within:bg-white focus-within:border-[var(--neutral-500,#899492)] focus-within:shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18)]",
              // Dark mode default
              "dark:bg-[var(--neutral-600-dark,#002e2d)] dark:border-[var(--neutral-300-dark,#00706e)]",
              // Dark mode hover
              "dark:hover:bg-[var(--neutral-500-dark,#004241)] dark:hover:border-[var(--neutral-400-dark,#004746)]",
              // Dark mode focus
              "dark:focus-within:bg-[var(--neutral-600-dark,#002e2d)] dark:focus-within:border-[var(--neutral-600-dark,#002e2d)] dark:focus-within:shadow-[inset_0px_0px_0px_1px_rgba(10,13,18,0.18)]",
              // Error state
              isError &&
                "border-[var(--red-800,#cb0a04)] hover:border-[var(--red-800,#cb0a04)] focus-within:border-[var(--red-800,#cb0a04)] dark:border-[var(--red-600,#fd4740)] dark:hover:border-[var(--red-600,#fd4740)] dark:focus-within:border-[var(--red-600,#fd4740)] focus-within:shadow-none",
              className
            )}
          >
            {/* Textarea field */}
            <textarea
              ref={ref}
              id={inputId}
              maxLength={maxLength}
              value={value}
              className={cn(
                "flex-1 min-w-0 h-full bg-transparent outline-none resize-none",
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

        {/* Bottom wrapper: Hint text/error message and char count */}
        <div className="flex gap-[var(--spacing-125,10px)] items-start justify-end w-full">
          {/* Hint text or error message */}
          {errorMessage && (
            <p
              id={`${inputId}-hint`}
              className={cn(
                "flex-1 font-medium text-[14px] leading-[1.5] tracking-[0.14px]",
                isError
                  ? "text-[var(--red-800,#cb0a04)] dark:text-[var(--red-600,#fd4740)]"
                  : "text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]"
              )}
            >
              {errorMessage}
            </p>
          )}

          {/* Character count */}
          {showCharCount && maxLength && (
            <p className="font-medium text-[12px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] text-right whitespace-nowrap">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };

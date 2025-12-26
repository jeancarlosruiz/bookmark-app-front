import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[var(--spacing-050,4px)] whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer",
  {
    variants: {
      hierarchy: {
        primary:
          "bg-[var(--teal-700,#014745)] text-white border-2 border-[rgba(255,255,255,0.12)] shadow-[0px_0px_0px_1px_inset_rgba(34,38,39,0.12)] hover:bg-[var(--teal-800,#013c3b)] focus-visible:shadow-[inset_0px_0px_0px_1px_var(--colors-effects-shadows-shadow-skeumorphic-inner-border,rgba(10,13,18,0.18))]",
        secondary:
          "bg-white border border-[var(--neutral-400,#c0cfcc)] text-[var(--neutral-900,#051513)] hover:bg-[var(--neutral-200,#e8f0ef)] focus-visible:border-[var(--neutral-300,#dde9e7)] focus-visible:shadow-[inset_0px_0px_0px_1px_var(--colors-effects-shadows-shadow-skeumorphic-inner-border,rgba(10,13,18,0.18))] dark:bg-[var(--neutral-800-dark,#001f1f)] dark:border-[var(--neutral-500-dark,#004241)] dark:text-white dark:hover:bg-[var(--neutral-600-dark,#002e2d)] dark:hover:border-[var(--neutral-500-dark,#004241)]",
        "secondary-active":
          "bg-white border border-[var(--teal-700,#014745)] text-[var(--teal-700,#014745)] dark:bg-[var(--neutral-800-dark,#001f1f)] dark:border-white dark:text-white",
      },
      size: {
        sm: "h-[42px] rounded-[var(--radius-md,8px)] px-[var(--spacing-150,12px)] py-[var(--spacing-125,10px)] text-[16px] leading-[1.4]",
        md: "h-[48px] rounded-[var(--radius-md,8px)] px-[var(--spacing-200,16px)] py-[var(--spacing-150,12px)] text-[16px] leading-[1.4]",
        "icon-sm": "size-[32px] rounded-[var(--radius-md,8px)] p-0",
      },
      state: {
        default: "",
        error:
          "bg-[var(--red-800,#cb0a04)] hover:bg-[var(--red-800,#cb0a04)] border-[rgba(255,255,255,0.12)]",
      },
    },
    defaultVariants: {
      hierarchy: "primary",
      size: "sm",
      state: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      hierarchy,
      size,
      state,
      asChild = false,
      iconLeading,
      iconTrailing,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isIconOnly = size === "icon-sm" && !children;

    return (
      <Comp
        className={cn(buttonVariants({ hierarchy, size, state, className }))}
        ref={ref}
        {...props}
      >
        {iconLeading && (
          <span className="shrink-0 size-5 flex items-center justify-center">
            {iconLeading}
          </span>
        )}
        {children && (
          <span className="px-[var(--spacing-xxs,2px)] flex flex-row">
            {children}
          </span>
        )}
        {iconTrailing && !isIconOnly && (
          <span className="shrink-0 size-5 flex items-center justify-center">
            {iconTrailing}
          </span>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };

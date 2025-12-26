"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

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

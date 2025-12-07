import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-white border border-[var(--neutral-400,#c0cfcc)] text-[var(--neutral-900,#051513)] hover:bg-[var(--neutral-200,#e8f0ef)] dark:bg-[var(--neutral-800-dark,#001f1f)] dark:border-[var(--neutral-500-dark,#004241)] dark:text-white dark:hover:bg-[var(--neutral-600-dark,#002e2d)]",
        ghost:
          "hover:bg-[var(--neutral-100,#e8f0ef)] text-[var(--neutral-900,#051513)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)] dark:text-white",
      },
      size: {
        sm: "size-8 p-0 rounded-[var(--radius-md,8px)]",
        md: "size-10 p-0 rounded-[var(--radius-md,8px)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };

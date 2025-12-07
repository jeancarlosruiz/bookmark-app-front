import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const FormHeader = ({ title, subtitle, className }: FormHeaderProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--spacing-sm,6px)] w-full",
        className,
      )}
    >
      <h1 className="font-bold text-[24px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-white">
        {title}
      </h1>
      {subtitle && (
        <p className="font-medium text-[14px] leading-[1.5] tracking-[0.14px] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
          {subtitle}
        </p>
      )}
    </div>
  );
};

FormHeader.displayName = "FormHeader";

export { FormHeader };

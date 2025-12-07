import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, checked, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <label className="relative inline-flex items-center justify-center cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            "size-4 border rounded-[4px] transition-all flex items-center justify-center",
            // Unchecked state
            "border-[var(--neutral-500,#899492)] bg-white dark:bg-transparent dark:border-[var(--neutral-300-dark,#00706e)]",
            // Checked state
            "peer-checked:bg-[var(--teal-700,#014745)] peer-checked:border-[var(--teal-700,#014745)] dark:peer-checked:bg-[var(--teal-700,#014745)] dark:peer-checked:border-[var(--teal-700,#014745)]",
            // Hover
            "peer-hover:border-[var(--neutral-800,#4c5659)] dark:peer-hover:border-[var(--neutral-100-dark,#b1b9b9)]",
            // Focus
            "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--teal-700,#014745)] peer-focus-visible:ring-offset-2",
            // Disabled
            "peer-disabled:opacity-50 peer-disabled:cursor-not-allowed",
            className
          )}
        >
          <Check
            className={cn(
              "size-3 text-white transition-opacity",
              checked ? "opacity-100" : "opacity-0"
            )}
            strokeWidth={3}
          />
        </div>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

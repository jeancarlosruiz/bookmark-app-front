"use client";
import { Button } from "@/components/atoms/button";
import { toast } from "sonner";

const DeleteLater = () => {
  const handleToast = () => {
    toast.success("Bookmark added successfully.", {
      style: {
        "--toast-icon-margin-start": "0px",
        "--toast-icon-margin-end": "0px",
        padding: "10px 12px",
        gap: "0.5rem",
        fontSize: "0.875rem",
      },
      cancel: {
        label: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              className="stroke-[var(--neutral-900)] opacity-[50%] dark:stroke-[var(--neutral-0)]"
              stroke="#051513"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M15 5 5 15M5 5l10 10"
            />
          </svg>
        ),
        onClick: () => {},
      },
      cancelButtonStyle: {
        background: "transparent",
      },
    });
  };
  return (
    <Button onClick={handleToast} size="sm">
      Toast
    </Button>
  );
};

export default DeleteLater;

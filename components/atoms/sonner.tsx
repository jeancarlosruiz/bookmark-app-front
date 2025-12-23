"use client";

import {
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="group"
      toastOptions={{
        classNames: {
          toast:
            "!bg-white dark:!bg-[#004241] !border !border-[#dde9e7] dark:!border-[#004746] !rounded-[8px] !shadow-[0px_6px_9px_0px_rgba(21,21,21,0.08)] dark:!shadow-[0px_6px_9px_0px_rgba(21,21,21,0.12)] !px-[12px] !py-[10px] !gap-[8px] !flex !items-center",
          title:
            "!text-[14px] !font-medium !text-[#051513] dark:!text-white !leading-[1.5] !tracking-[0.14px]",
          description:
            "!text-[14px] !font-medium !text-[#051513] dark:!text-white !leading-[1.5] !tracking-[0.14px]",
          actionButton:
            "!bg-[#014745] dark:!bg-[#014745] !text-white",
          cancelButton:
            "!bg-[#dde9e7] dark:!bg-[#002e2d] !text-[#051513] dark:!text-white",
          closeButton:
            "!opacity-50 !bg-transparent !border-0 !text-[#051513] dark:!text-white hover:!opacity-100",
        },
      }}
      icons={{
        success: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              className="stroke-[#014745] dark:stroke-white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M16.666 5 7.5 14.167 3.333 10"
            />
          </svg>
        ),
        info: <InfoIcon className="size-5 text-[#051513] dark:text-white" />,
        warning: <TriangleAlertIcon className="size-5 text-[#051513] dark:text-white" />,
        error: <OctagonXIcon className="size-5 text-[#051513] dark:text-white" />,
        loading: <Loader2Icon className="size-5 animate-spin text-[#051513] dark:text-white" />,
      }}
      {...props}
    />
  );
};

export { Toaster };

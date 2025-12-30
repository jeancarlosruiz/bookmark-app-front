"use client";
import { Button } from "../atoms/button";
import { Menu } from "lucide-react";
import { useSidebar } from "@/components/atoms/sidebar";

export default function MenuButton() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      hierarchy="secondary"
      size="md"
      onClick={toggleSidebar}
      className="lg:hidden shrink-0 p-[var(--spacing-125,10px)]"
      aria-label="Toggle sidebar"
    >
      <Menu className="size-5" />
    </Button>
  );
}

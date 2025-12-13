"use client";

import * as React from "react";
import { Home, Archive } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/atoms/sidebar";
import { SidebarNavItem } from "@/components/molecules/sidebar-nav-item";
import { SidebarTagItem } from "@/components/molecules/sidebar-tag-item";
import BookmarkLogo from "../atoms/logo";
import { ScrollArea } from "@/components/atoms/scroll-area";

// Mock data for tags - in a real app, this would come from an API or state management
const tags = [
  { label: "Ai", count: 1, checked: false },
  { label: "Community", count: 5, checked: false },
  { label: "Compatibility", count: 1, checked: false },
  { label: "CSS", count: 6, checked: false },
  { label: "Design", count: 1, checked: false },
  { label: "Framework", count: 2, checked: false },
  { label: "Git", count: 1, checked: false },
  { label: "HTML", count: 2, checked: false },
  { label: "JavaScript", count: 3, checked: false },
  { label: "Layout", count: 3, checked: false },
  { label: "Learning", count: 6, checked: false },
  { label: "Performance", count: 2, checked: false },
  { label: "Practice", count: 5, checked: false },
  { label: "Reference", count: 4, checked: false },
  { label: "Tips", count: 4, checked: false },
  { label: "Tools", count: 4, checked: false },
  { label: "Tutorial", count: 3, checked: false },
];

export function AppSidebar() {
  const [tagStates, setTagStates] = React.useState(tags);

  const handleTagChange = (index: number, checked: boolean) => {
    setTagStates((prev) =>
      prev.map((tag, i) => (i === index ? { ...tag, checked } : tag)),
    );
  };

  return (
    <Sidebar>
      <SidebarHeader className="pl-[20px] pb-[10px] py-[20px] mb-[16px]">
        {/* Logo */}
        <BookmarkLogo />
      </SidebarHeader>

      <SidebarContent className="flex flex-col gap-[var(--spacing-200,16px)] pb-[var(--spacing-2xl,20px)] pt-0 px-[var(--spacing-xl,16px)]">
        {/* Navigation */}
        <SidebarGroup className="flex flex-col items-start w-full p-0">
          <SidebarNavItem
            href="/"
            icon={<Home className="size-5" />}
            label="Home"
            active={true}
          />
          <SidebarNavItem
            href="/archived"
            icon={<Archive className="size-5" />}
            label="Archived"
            active={false}
          />
        </SidebarGroup>

        {/* Tags */}
        <SidebarGroup className="flex flex-col items-start w-full p-0 flex-1 overflow-y-hidden">
          {/* Subheading */}
          <div className="flex items-center pb-[var(--spacing-xs,4px)] pt-0 px-[var(--spacing-150,12px)] w-full">
            <p className="flex-1 font-bold text-[12px] leading-[1.4] text-[#4d4d4d] dark:text-[var(--neutral-100-dark,#b1b9b9)]">
              TAGS
            </p>
          </div>

          <ScrollArea className="w-full flex-1 h-full">
            {/* Tag list */}
            <div className="pb-[15px]">
              {tagStates.map((tag, index) => (
                <SidebarTagItem
                  key={tag.label}
                  label={tag.label}
                  count={tag.count}
                  checked={tag.checked}
                  onCheckedChange={(checked) => handleTagChange(index, checked)}
                />
              ))}
            </div>
          </ScrollArea>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

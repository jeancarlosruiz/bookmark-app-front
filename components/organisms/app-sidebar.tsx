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
import { EmptyTags } from "@/components/molecules/empty-tags";
import BookmarkLogo from "../atoms/logo";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { getTagsAction } from "@/actions/tags";
import { TagsType } from "@/lib/zod/tag";

export async function AppSidebar() {
  const tags = await getTagsAction();

  let data: TagsType[] | undefined = [];

  if (tags.success === true) {
    data = tags.data;
  }

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
            {tags !== undefined && data!.length > 0 ? (
              <SidebarTagItem tags={data!} />
            ) : (
              <EmptyTags />
            )}
          </ScrollArea>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

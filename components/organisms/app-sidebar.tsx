import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/atoms/sidebar";
import { SidebarTagItem } from "@/components/molecules/sidebar-tag-item";
import { EmptyTags } from "@/components/molecules/empty-tags";
import BookmarkLogo from "../atoms/logo";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { getTagsAction } from "@/actions/tags";
import { TagsType } from "@/lib/zod/tag";
import NavigationList from "../molecules/navigation-list";
import { Suspense } from "react";

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
        <NavigationList />
        {/* Tags */}
        <SidebarGroup className="flex flex-col items-start w-full p-0 flex-1 overflow-y-hidden">
          <Suspense fallback={<div className="w-full h-full" />}>
            <SidebarTagItem tags={data!} />
          </Suspense>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  );
}

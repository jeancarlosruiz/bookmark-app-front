import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/atoms/sidebar";

import BookmarkLogo from "@/components/atoms/logo";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <BookmarkLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

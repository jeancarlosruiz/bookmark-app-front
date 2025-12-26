"use client";
import { Archive, Home } from "lucide-react";
import { SidebarGroup } from "../atoms/sidebar";
import { SidebarNavItem } from "./sidebar-nav-item";
import { usePathname } from "next/navigation";

const NavigationList = () => {
  const pathname = usePathname();
  const isActive = (url: string) => pathname === url;
  return (
    <SidebarGroup className="flex flex-col items-start w-full p-0">
      <SidebarNavItem
        href="/"
        icon={<Home className="size-5" />}
        label="Home"
        active={isActive("/")}
      />
      <SidebarNavItem
        href="/archived"
        icon={<Archive className="size-5" />}
        label="Archived"
        active={isActive("/archived")}
      />
    </SidebarGroup>
  );
};

export default NavigationList;

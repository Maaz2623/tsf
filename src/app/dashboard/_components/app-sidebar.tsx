"use client";
import { Calendar, CalendarIcon, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import OrganisationDropdown from "@/components/organisation-dropdown";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

const items = [
  {
    title: "Events",
    url: "/dashboard/events",
    icon: CalendarIcon,
    tag: "events",
  },
  {
    title: "Inbox",
    url: "/dashboard/inbox",
    icon: Inbox,
    tag: "",
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    tag: "",
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    tag: "",
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    tag: "",
  },
];

const adminItems = [
  {
    title: "Events Management",
    url: "/dashboard/admin/events-management",
    icon: CalendarIcon,
    tag: "events-management",
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();
  const [activeUrl, setActiveUrl] = useState(pathname); // Track the active URL

  return (
    <Sidebar variant="inset" collapsible="icon">
      <div className="pl-2.5 py-1">
        <OrganisationDropdown />
      </div>
      <Separator />
      <SidebarContent>
        <Separator />
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = activeUrl === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-9",
                        isActive && "bg-neutral-200",
                        !open &&
                          isActive &&
                          "bg-primary text-white transition-colors duration-300"
                      )}
                      onClick={() => {
                        setActiveUrl(item.url);
                      }} // Optimistically update UI instantly
                    >
                      <Link href={item.url}>
                        {open && (
                          <div
                            className={cn(
                              "h-4 w-1 scale-y-0 rounded-full bg-primary transition-all duration-300",
                              isActive && "scale-y-100"
                            )}
                          />
                        )}
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                const isActive = activeUrl === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "h-9",
                        isActive && "bg-neutral-200",
                        !open &&
                          isActive &&
                          "bg-primary text-white transition-colors duration-300"
                      )}
                      onClick={() => {
                        setActiveUrl(item.url);
                      }} // Optimistically update UI instantly
                    >
                      <Link href={item.url}>
                        {open && (
                          <div
                            className={cn(
                              "h-4 w-1 scale-y-0 rounded-full bg-primary transition-all duration-300",
                              isActive && "scale-y-100"
                            )}
                          />
                        )}
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

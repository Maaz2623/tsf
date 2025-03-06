"use client";
import {
  Calendar,
  Package,
  QrCodeIcon,
  Ticket,
  TicketCheckIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Events",
    url: "/dashboard/events",
    icon: Calendar,
  },
  {
    title: "Tickets",
    url: "/dashboard/tickets",
    icon: Ticket,
  },
  {
    title: "Contingents",
    url: "/dashboard/contingents",
    icon: Package,
  },
];

const adminItems = [
  {
    title: "Ticket Verifier",
    url: "/dashboard/ticket-verifier",
    icon: TicketCheckIcon,
  },
  {
    title: "Ticket Scanner",
    url: "/dashboard/ticket-scanner",
    icon: QrCodeIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="inset" className="" collapsible="icon">
      <SidebarContent className="bg-white rounded-xl">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn("", isActive && "bg-neutral-200")}
                    >
                      <Link href={item.url}>
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
          <SidebarGroupLabel>Admin Apps</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                const isActive = pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn("", isActive && "bg-neutral-200")}
                    >
                      <Link href={item.url}>
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

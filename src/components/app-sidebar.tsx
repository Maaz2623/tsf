"use client";
import {
  Calendar,
  Package,
  PackageCheckIcon,
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
  useSidebar,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SidebarHeaderTsf from "./ui/sidebar-header-tsf";
import { useTransition } from "react";
import { trpc } from "@/trpc/client";

// Menu items.
export const items = [
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
    title: "Contingent Verifier",
    url: "/dashboard/contingent-verifier",
    icon: PackageCheckIcon,
  },
  {
    title: "Ticket Scanner",
    url: "/dashboard/ticket-scanner",
    icon: QrCodeIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();

  const { data: user } = trpc.users.getUserByClerkId.useQuery();

  const { setOpenMobile } = useSidebar();

  const handleClick = () => {
    startTransition(() => setOpenMobile(false));
  };

  return (
    <Sidebar variant="inset" className="" collapsible="icon">
      <SidebarHeaderTsf />
      <SidebarContent className="bg-white rounded-xl">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.includes(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <Link href={item.url} prefetch key={item.url}>
                      <SidebarMenuButton
                        onClick={handleClick}
                        className={cn("", isActive && "bg-neutral-200")}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {(user?.role === "admin" || user?.role === "moderator") && (
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
        )}
      </SidebarContent>
    </Sidebar>
  );
}

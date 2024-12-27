"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import OrganisationDropdown from "./organisation-dropdown";
import {
  sidebarBackendItems,
  sidebarGeneralItems,
  sidebarProfileItems,
} from "@/constants/sidebar-items";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { RoleType } from "@/constants";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut, user } = useClerk();

  const data = useQuery(api.users.getCurrentUser, {
    userId: user?.id as string,
  });

  const generalItems = React.useMemo(() => sidebarGeneralItems, []);
  const profileItems = React.useMemo(() => sidebarProfileItems, []);
  const backendItems = React.useMemo(() => sidebarBackendItems, []);

  // if (!currentUser) return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderSidebarGroup = (label: string, items: any[]) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.link);

            return (
              <SidebarMenuItem key={item.link}>
                <SidebarMenuButton
                  asChild
                  aria-label={`Navigate to ${item.label}`}
                  className={cn(
                    "h-10 text-base",
                    isActive && "bg-black/5 font-medium"
                  )}
                >
                  <Link href={item.link}>
                    <div
                      className={cn(
                        "h-full w-1 bg-green-600 scale-y-0 rounded-full transition-transform duration-300",
                        isActive && "scale-y-100"
                      )}
                    />
                    {Icon && <Icon />}
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar {...props} className="">
      <SidebarHeader>
        <OrganisationDropdown />
      </SidebarHeader>
      <SidebarContent>
        {renderSidebarGroup("General", generalItems)}
        {renderSidebarGroup("Account & Activities", profileItems)}
        {data?.role === RoleType.ADMIN &&
          renderSidebarGroup("Content Management", backendItems)}
      </SidebarContent>
      <SidebarFooter className="">
        <Button
          onClick={() => {
            router.push(`/`);
            signOut({ redirectUrl: "/" });
          }}
          variant="secondary"
          className="text-rose-600 flex justify-between items-center hover:text-rose-600"
        >
          <p>Sign out</p>
          <LogOutIcon />
        </Button>
      </SidebarFooter>
      <SidebarRail className="border-1 border-green-500" />
    </Sidebar>
  );
}

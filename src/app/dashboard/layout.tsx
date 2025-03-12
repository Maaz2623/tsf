import { AppSidebar } from "@/components/app-sidebar";
import ContingentModal from "@/components/contingent-modal";
import { FloatingNav } from "@/components/floating-navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

import { Calendar, Ticket, Package, HandHelping } from "lucide-react";
import { JSX } from "react";

const navItems: {
  name: string;
  link: string;
  icon?: JSX.Element;
}[] = [
  {
    name: "Events",
    link: "/dashboard/events",
    icon: <Calendar className="size-5" />,
  },
  {
    name: "Tickets",
    link: "/dashboard/tickets",
    icon: <Ticket className="size-5" />,
  },
  {
    name: "Contingents",
    link: "/dashboard/contingents",
    icon: <Package className="size-5" />,
  },
  {
    name: "Help",
    link: "/dashboard/help",
    icon: <HandHelping className="size-5" />,
  },
];

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-neutral-400">
      {/* <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <Suspense> */}
      <AppSidebar />
      <SidebarInset>
        <main>
          <FloatingNav navItems={navItems} />
          <div className="px-2 py-3 w-full flex items-center justify-between border-b ">
            <SidebarTrigger />
            <div className="flex gap-x-3">
              <ContingentModal />
              <UserButton />
            </div>
          </div>
          {children}
        </main>
      </SidebarInset>
      {/* </Suspense>
        </ErrorBoundary>
      </HydrateClient> */}
    </SidebarProvider>
  );
}

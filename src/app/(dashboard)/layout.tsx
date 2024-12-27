import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import SidebarBreadcrumb from "./_components/sidebar-breadcrumb";
import MobileBottomBar from "@/components/mobile-bottom-bar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="relative">
      <AppSidebar variant="inset" className="" />
      <SidebarInset className="">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <SidebarBreadcrumb />
        </header>
        <div className="md:p-8 lg:p-10 p-6 h-full">{children}</div>
      </SidebarInset>
      <MobileBottomBar />
    </SidebarProvider>
  );
}

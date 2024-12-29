import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import Topbar from "./_components/top-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-transparent space-y-2">
        <div className="bg-neutral-50 rounded-lg">
          <Topbar />
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

import { AppSidebar } from "@/components/app-sidebar";
import ContingentModal from "@/components/contingent-modal";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="bg-neutral-400">
      <AppSidebar />
      <SidebarInset>
        <main>
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
    </SidebarProvider>
  );
}

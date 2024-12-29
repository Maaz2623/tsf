import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const Topbar = () => {
  return (
    <div className="w-full p-2 flex justify-between items-center  shadow-sm">
      <SidebarTrigger className="" />
      <div className="flex items-center gap-x-4">
        <div className="mr-2">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Topbar;

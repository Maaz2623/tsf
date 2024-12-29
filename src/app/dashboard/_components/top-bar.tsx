import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Topbar = () => {
  return (
    <div className="w-full p-2 flex justify-between items-center border-b shadow-sm">
      <SidebarTrigger className="" />
      <div className="flex items-center gap-x-4">
        <div className="size-10 border rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default Topbar;

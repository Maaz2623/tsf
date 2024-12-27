import { Separator } from "@/components/ui/separator";
import { UserProfile } from "@clerk/nextjs";
import React from "react";

const ManageProfilePage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-y-4">
      <h1 className="text-2xl font-medium">Manage Profile</h1>
      <Separator className="my-8" />
      <div className="w-full flex justify-center items-center">
        <UserProfile routing="hash" />
      </div>
    </div>
  );
};

export default ManageProfilePage;

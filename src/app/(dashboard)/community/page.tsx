import React, { Suspense } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Separator } from "@/components/ui/separator";
import { convex } from "@/lib/utils";
import { api } from "../../../../convex/_generated/api";
import { currentUser } from "@clerk/nextjs/server";
import FullscreenLoader from "@/components/fullscreen-loader";

const MembersPage = async () => {
  const user = await currentUser();

  if (!user) return;

  const data = await convex.query(api.users.getAllUsers);

  if (!data) return;

  const formattedUserList = data.map((user) => ({
    profileImage: user.imageUrl || "",
    user: {
      email: user.emailAddress,
      fullName: user.fullName,
    },
    id: user._id,
  }));

  return (
    <div className="h-full">
      <header>
        <h1 className="text-3xl font-bold">Our Community</h1>
        <p className="text-sm text-neutral-600 mt-2">
          Meet our members of community and great achievers
        </p>
      </header>
      <Separator className="my-6" />
      <div className="">
        <Suspense fallback={<FullscreenLoader title="loading members..." />}>
          <DataTable columns={columns} data={formattedUserList} />
        </Suspense>
      </div>
    </div>
  );
};

export default MembersPage;

"use client";

import { ColumnDef } from "@tanstack/react-table";
import MemberRow from "./_components/member-row";

// This type is used to define the shape of our data.
export type User = {
  profileImage: string;
  user: {
    fullName: string;
    email: string;
  };
  id: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => {
      const profileImage = row.original.profileImage;
      return (
        <MemberRow
          fullName={row.original.user.fullName}
          email={row.original.user.email}
          id={row.original.id}
          profileImage={profileImage}
        />
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const user = row.getValue(columnId) as {
        fullName: string;
        email: string;
      };
      const id = row.original.id;

      // Check if filterValue matches fullName, email, or id
      return (
        user.fullName.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
        id.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  },
];

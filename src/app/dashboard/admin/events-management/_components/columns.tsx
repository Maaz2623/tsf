"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import { format } from "date-fns";
import Link from "next/link";
import { LinkIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Event = {
  _id: Id<"events">;
  name: string;
  description: string;
  venue: {
    label: string;
    location: string;
  };
  date: string;
  price: number;
  poster?: string; // Optional field
};

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <p className="w-[150px] truncate">{row.original.name}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return <p className="w-[250px] truncate">{row.original.description}</p>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return <p className="w-[100px] truncate">{row.original.date}</p>;
    },
  },
  {
    accessorKey: "venue",
    header: "Venue",
    cell: ({ row }) => {
      return (
        <Link
          target="_blank"
          href={row.original.venue.location}
          className="w-[200px] truncate flex items-center justify-start hover:underline"
        >
          <LinkIcon className="size-4 mr-1 text-blue-800" />
          {row.original.venue.label}
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Ticket Price",
    cell: ({ row }) => {
      return (
        <p className="w-[100px] flex justify-center items-center">
          ₹{row.original.price}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const { name, description, venue, _id, price } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            Event Edit
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

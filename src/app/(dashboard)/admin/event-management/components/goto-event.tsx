"use client";
import React from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { SquareArrowOutUpRight } from "lucide-react";

export const GotoEvent = ({ eventId }: { eventId: Id<"events"> }) => {
  const router = useRouter();
  return (
    <DropdownMenuItem
      className=""
      onClick={() => router.push(`/events/${eventId}`)}
    >
      <SquareArrowOutUpRight className="size-4 mr-1" />
      Go to page
    </DropdownMenuItem>
  );
};

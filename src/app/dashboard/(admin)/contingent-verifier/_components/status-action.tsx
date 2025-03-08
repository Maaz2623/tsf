"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { MoreHorizontalIcon } from "lucide-react";
import toast from "react-hot-toast";

export const StatusAction = ({ ticketId }: { ticketId: string }) => {
  const utils = trpc.useUtils();
  const update = trpc.contingents.updatedStatus.useMutation({
    onSuccess: () => {
      utils.contingents.getAllContingents.invalidate();
    },
  });

  const handleUpdate = async ({
    value,
  }: {
    value: "pending" | "processing" | "verified" | "rejected";
  }) => {
    toast.promise(
      update.mutateAsync({
        contingentId: ticketId,
        value: value,
      }),
      {
        loading: "Updating status...",
        success: "Status updated!",
        error: "Status update failed.",
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreHorizontalIcon className="size-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="font-semibold">
          Change Status
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {["pending", "processing", "verified", "rejected"].map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() =>
              handleUpdate({
                value: status as
                  | "pending"
                  | "processing"
                  | "verified"
                  | "rejected",
              })
            }
            textValue={status}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";
import PageHeader from "@/components/page-header";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import QRCode from "react-qr-code";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { ticketStatus } from "@/db/schema";
import { StatusAction } from "./_components/status-action";
import { LoaderCircle, Mail, Phone, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TicketVerifierPage = () => {
  const { data: tickets, isPending } = trpc.tickets.getAllTickets.useQuery();

  if (isPending) {
    return (
      <div className="h-full w-full flex justify-center items-center ">
        <div className=" text-neutral-600 items-center justify-center flex flex-col">
          <LoaderCircle className="size-5 animate-spin" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6">
      <PageHeader
        title="Your tickets"
        description="Manage all your tickets from here"
      />
      <div className="h-14 flex items-center md:justify-start justify-center w-full mt-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Payment status" />
          </SelectTrigger>
          <SelectContent>
            {ticketStatus.enumValues.map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg overflow-hidden my-4 border">
        <Table className="">
          <TableHeader className="bg-neutral-100">
            <TableRow>
              <TableHead className="w-[100px] pl-4">Ticket QR</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Fest</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Screenshot</TableHead>
              <TableHead className="text-center">Events</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-left">Created At</TableHead>
              <TableHead className="text-center pr-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ?.sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((ticket) => {
                const formattedUser = {
                  name: ticket.user?.name,
                  email: ticket.user?.email,
                  imageUrl: ticket.user?.imageUrl,
                  phoneNumber: ticket.user?.phoneNumber,
                };

                return (
                  <TableRow key={ticket.ticketId}>
                    <TableCell className="font-medium text-center">
                      <TicketQr ticketId={ticket.ticketId}>Show</TicketQr>
                    </TableCell>
                    <TableCell className="text-center flex items-center gap-2">
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full animate-ping",
                          ticket.status === "pending" && "bg-orange-700",
                          ticket.status === "processing" && "bg-orange-400",
                          ticket.status === "verified" && "bg-green-500",
                          ticket.status === "rejected" && "bg-red-500"
                        )}
                      />
                      <span
                        className={cn(
                          "font-medium",
                          ticket.status === "pending" && "text-orange-700",
                          ticket.status === "processing" && "text-orange-400",
                          ticket.status === "verified" && "text-green-500",
                          ticket.status === "rejected" && "text-red-500"
                        )}
                      >
                        {ticket.status.charAt(0).toUpperCase() +
                          ticket.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="w-[350px] truncate">
                      {ticket.festType}
                    </TableCell>
                    <TableCell className="w-[350px] underline-offset-2 underline truncate">
                      <UserDetailsDialog user={formattedUser}>
                        Details
                      </UserDetailsDialog>
                    </TableCell>
                    <TableCell className="w-[300px] truncate">
                      <PaymentScreenshotDialog
                        imageUrl={ticket.paymentScreentshotUrl}
                      >
                        Image
                      </PaymentScreenshotDialog>
                    </TableCell>
                    <TableCell className="text-center">
                      <EventDetailsPopover events={ticket.events}>
                        Details
                      </EventDetailsPopover>
                    </TableCell>
                    <TableCell className="text-center">
                      ₹
                      {ticket.events.reduce(
                        (total, event) => total + event.price,
                        0
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      {format(ticket.createdAt, "dd MMMM, yyyy")}
                    </TableCell>
                    <TableCell className="text-center flex justify-center">
                      <StatusAction ticketId={ticket.ticketId} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TicketVerifierPage;

type UserType = {
  email?: string;
  name?: string;
  imageUrl?: string;
  phoneNumber?: string | null;
};

const UserDetailsDialog = ({
  user,
  children,
}: {
  user: UserType;
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="underline underline-offset-2">
        {children}
      </DialogTrigger>
      <DialogContent className="p-6 max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl text-center font-semibold">
            User Details
          </DialogTitle>
        </DialogHeader>

        {/* User Profile Section */}
        <div className="flex flex-col items-center gap-3">
          <Avatar className="w-16 h-16">
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback className="bg-gray-300 text-gray-700">
              <UserIcon className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-medium">{user.name}</h2>
        </div>

        {/* User Information */}
        <ScrollArea className="mt-4 space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md">
            <Mail className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-800">{user.email || "N/A"}</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-md">
            <Phone className="w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-800">{user.phoneNumber || "N/A"}</p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const PaymentScreenshotDialog = ({
  children,
  imageUrl,
}: {
  children: React.ReactNode;
  imageUrl: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="underline-offset-2 underline">
        {children}
      </DialogTrigger>
      <DialogContent className="flex justify-center items-center">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <div className="w-[350px] aspect-square">
          <Suspense fallback={<p>loading...</p>}>
            <Image
              src={imageUrl}
              alt="ss"
              width={450}
              height={450}
              className="w-full rounded-lg"
            />
          </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const EventDetailsPopover = ({
  children,
  events,
}: {
  children: React.ReactNode;
  events: EventType[];
}) => {
  return (
    <Popover>
      <PopoverTrigger className="underline underline-offset-2">
        {children}
      </PopoverTrigger>
      <PopoverContent className="p-4 bg-white shadow-lg rounded-lg border w-64">
        <h3 className="text-lg font-semibold mb-2">
          Event Details (
          {events[0].festType === "elysian" ? "Elysian" : "Solaris"})
        </h3>
        <ScrollArea className="h-60">
          <div className="space-y-3">
            {events.map((event, i) => (
              <div key={i} className="p-3 bg-gray-100 rounded-md">
                <p className="text-sm font-medium text-gray-800">
                  {event.title}
                </p>
                <p className="text-xs text-gray-600">{event.description}</p>
                <p className="text-xs text-gray-700 mt-1">
                  Price: <span className="font-semibold">₹{event.price}</span>
                </p>
                {event.date && (
                  <p className="text-xs text-gray-500">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

const TicketQr = ({
  children,
  ticketId,
}: {
  children: React.ReactNode;
  ticketId: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger className="underline underline-offset-2">
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="w-full text-center">
            Show this when asked
          </DialogTitle>
          <VisuallyHidden>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="flex justify-center items-center">
          <div className="shadow-md rounded-xl p-4">
            <QRCode
              value={ticketId}
              size={150}
              bgColor="#ffffff"
              fgColor="#000000"
              className="rounded-lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

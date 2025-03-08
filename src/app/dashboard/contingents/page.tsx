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
import { cn } from "@/lib/utils";
import Image from "next/image";
import { contingentPrice } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";

const TicketsPage = () => {
  const { data: contingents, isFetching } =
    trpc.contingents.getByClerkId.useQuery();

  if (isFetching || !contingents) {
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
        <div className="rounded-lg overflow-hidden my-4 h-60 border">
          <Skeleton className="w-full h-full" />
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
              <TableHead>Screenshot</TableHead>
              <TableHead className="text-center">Events</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-left pl-3">Created At</TableHead>
            </TableRow>
          </TableHeader>
          {contingents.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-60 text-center text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          <TableBody>
            {contingents.map((contingent) => {
              return (
                <TableRow key={contingent.id}>
                  <TableCell className="font-medium text-center">
                    <TicketQr ticketId={contingent.id}>Show</TicketQr>
                  </TableCell>
                  <TableCell className="text-center flex items-center gap-2">
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full animate-ping",
                        contingent.status === "pending" && "bg-orange-700",
                        contingent.status === "processing" && "bg-orange-400",
                        contingent.status === "verified" && "bg-green-500",
                        contingent.status === "rejected" && "bg-red-500"
                      )}
                    />
                    <span
                      className={cn(
                        "font-medium",
                        contingent.status === "pending" && "text-orange-700",
                        contingent.status === "processing" && "text-orange-400",
                        contingent.status === "verified" && "text-green-500",
                        contingent.status === "rejected" && "text-red-500"
                      )}
                    >
                      {contingent.status.charAt(0).toUpperCase() +
                        contingent.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="w-[300px] truncate">
                    {contingent.festType === "elysian" ? "Elysian" : "Solaris"}
                  </TableCell>
                  <TableCell className="truncate">
                    <PaymentScreenshotDialog
                      imageUrl={contingent.paymentScreentshotUrl}
                    >
                      Image
                    </PaymentScreenshotDialog>
                  </TableCell>
                  <TableCell className="text-center">
                    <EventDetailsPopover events={contingent.events}>
                      Details
                    </EventDetailsPopover>
                  </TableCell>
                  <TableCell className="text-center">
                    ₹{contingentPrice}
                  </TableCell>
                  <TableCell className="text-left pl-3">
                    {format(contingent.createdAt, "dd MMMM, yyyy")}
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

export default TicketsPage;

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
        <h3 className="text-lg font-semibold mb-2">Event Details</h3>
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

"use client";
import PageHeader from "@/components/page-header";
import { trpc } from "@/trpc/client";
import React, { useRef, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut } from "lucide-react";

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
        title="Your contingent packages"
        description="Manage all your subscritions from here"
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
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const lastTouchDistance = useRef<number | null>(null);

  // Start dragging (Mouse & Touch)
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      if (e.touches.length === 2) return; // Ignore if pinch gesture
      setStartPos({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    } else {
      setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
    setDragging(true);
  };

  // Drag movement (Mouse & Touch)
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;

    if ("touches" in e) {
      if (e.touches.length === 2) {
        // Handle pinch zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const newDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );

        if (lastTouchDistance.current !== null) {
          const scaleChange = newDistance / lastTouchDistance.current;
          setZoom((z) => Math.min(3, Math.max(1, z * scaleChange)));
        }
        lastTouchDistance.current = newDistance;
        return;
      }
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y,
      });
    } else {
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  // Stop dragging (Mouse & Touch)
  const handleEnd = () => {
    setDragging(false);
    lastTouchDistance.current = null;
  };

  return (
    <Dialog>
      <DialogTrigger className="underline-offset-2 underline">
        {children}
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Preview Image</DialogTitle>
        </DialogHeader>

        {/* Image Container */}
        <div
          className="relative w-[300px] h-[300px] border rounded-lg overflow-hidden flex justify-center items-center touch-none"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          <Image
            src={imageUrl}
            alt="Preview"
            // width={500}
            // height={500}
            fill
            className="cursor-grab active:cursor-grabbing object-contain transition-transform duration-300"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            }}
            draggable={false} // Prevents default browser dragging
          />
        </div>

        {/* Zoom Controls */}
        <div className="mt-4 flex gap-4">
          <Button
            variant="outline"
            onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
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

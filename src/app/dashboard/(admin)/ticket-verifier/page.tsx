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
import { StatusAction } from "./_components/status-action";
import { Mail, Phone, UserIcon, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import * as XLSX from "xlsx";

const TicketVerifierPage = () => {
  const { data: tickets, isFetching } = trpc.tickets.getAllTickets.useQuery();

  if (isFetching || !tickets) {
    return (
      <div className="px-6">
        <PageHeader
          title="Your tickets"
          description="Manage all your tickets from here"
        />
        <div className="rounded-lg overflow-hidden my-4 h-60 border">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
    );
  }

  const exportToExcel = () => {
    const worksheetData = tickets.map((ticket) => ({
      "Ticket QR": ticket.ticketId,
      Status: ticket.status,
      Fest: ticket.festType === "elysian" ? "Elysian" : "Solaris",
      User: ticket.user?.name || "N/A",
      Email: ticket.user?.email || "N/A",
      "Phone Number": ticket.user?.phoneNumber || "N/A",
      Screenshot: ticket.paymentScreentshotUrl || "N/A",
      Events: ticket.events.map((event) => event.title).join(", "),
      Amount: `₹${ticket.events.reduce(
        (total, event) => total + event.price,
        0
      )}`,
      "Created At": new Date(ticket.createdAt).toLocaleDateString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // **Fix: Use explicit types**
    const keys = Object.keys(
      worksheetData[0]
    ) as (keyof (typeof worksheetData)[0])[];

    // **Auto-adjust column width based on content length**
    const columnWidths = keys.map((key) => ({
      wch: Math.max(
        key.length,
        ...worksheetData.map(
          (row) => String(row[key as keyof typeof row]).length
        )
      ),
    }));
    worksheet["!cols"] = columnWidths;

    // **Bold headers**
    const range = XLSX.utils.decode_range(worksheet["!ref"] || "");
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = { font: { bold: true } };
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");

    XLSX.writeFile(workbook, "tickets.xlsx");
  };

  return (
    <div className="px-6">
      <PageHeader
        title="Ticket Verifier"
        description="Manage ticket status from here"
      />
      <div className="h-10 flex justify-end items-center">
        <Button className="" variant="outline" onClick={exportToExcel}>
          Export
        </Button>
      </div>
      <div className="rounded-lg overflow-hidden my-4 border">
        <Table>
          <TableHeader className="bg-neutral-100">
            <TableRow>
              <TableHead className="w-[100px] pl-4">Ticket QR</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="pl-6">Fest</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Screenshot</TableHead>
              <TableHead className="text-center">Events</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-left">Created At</TableHead>
              <TableHead className="text-center pr-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {tickets.length === 0 && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-60 text-center text-gray-500"
                >
                  No results found.
                </TableCell>
              </TableRow>
            </TableBody>
          )}
          <TableBody>
            {tickets.map((ticket) => {
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
                  <TableCell className="w-[350px] truncate pl-6">
                    {ticket.festType === "elysian" ? "Elysian" : "Solaris"}
                  </TableCell>
                  <TableCell className="w-[350px] underline-offset-2 underline truncate">
                    <UserDetailsDialog
                      phoneNumber={ticket.phoneNumber}
                      user={formattedUser}
                    >
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
  phoneNumber,
}: {
  user: UserType;
  children: React.ReactNode;
  phoneNumber: string;
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
            <p className="text-sm text-gray-800">{phoneNumber || "N/A"}</p>
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

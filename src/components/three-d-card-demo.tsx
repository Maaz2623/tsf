"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import {
  StarIcon,
  TrashIcon,
  UsersIcon,
  CalendarIcon,
  TicketsIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { trpc } from "@/trpc/client";
import { Skeleton } from "./ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ThreeDCardDemo({
  title,
  description,
  price,
  rating,
  teamSize,
  date,
  maxRegistration,
  selectedEvents,
  setSelectedEvents,
  event,
}: {
  selectedEvents: EventType[];
  setSelectedEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  title: string;
  description: string;
  price: number | "Free";
  rating: number;
  teamSize?: number;
  date?: string;
  maxRegistration?: number;
  event: EventType;
}) {
  const { data: bookedTickets, isSuccess: fetchedBookedTickets } =
    trpc.tickets.getByEventTitle.useQuery({
      title,
    });

  const { data: bookedContingents, isSuccess: fetchedBookedContingents } =
    trpc.contingents.getBookedContingents.useQuery({
      title,
    });

  const { data: userTicket, isLoading: isUserTicketLoading } =
    trpc.tickets.getByEventTitleUserId.useQuery({ title });

  const totalTicketsBooked =
    fetchedBookedContingents && fetchedBookedTickets
      ? (bookedContingents?.length || 0) + (bookedTickets?.length || 0)
      : 0;

  return (
    <CardContainer className="inter-var cursor-pointer rounded-xl bg-white/20">
      <CardBody
        className="relative group/card dark:bg-black dark:border-white/[0.2] shadow-xl border-black/[0.1] 
        w-[90%] md:w-[300px] min-h-[420px] rounded-xl p-4 border flex flex-col"
      >
        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-lg font-bold text-neutral-600 dark:text-white truncate"
        >
          {title}
        </CardItem>

        {/* Description */}
        <Popover>
          <PopoverTrigger>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm mt-2 dark:text-neutral-300 line-clamp-2 text-start"
            >
              {description || "No description available"}
            </CardItem>
          </PopoverTrigger>
          <PopoverContent>{description}</PopoverContent>
        </Popover>

        {/* Image */}
        <CardItem translateZ="100" className="w-full mt-4">
          {event.imageUrl && (
            <Image
              src={event.imageUrl}
              height="1000"
              width="1000"
              className="h-[140px] w-full object-cover rounded-xl"
              alt="thumbnail"
            />
          )}
        </CardItem>

        {/* Event Details Section */}
        <div className="mt-4 flex flex-col flex-grow">
          {/* Rating & Team Size */}
          <div className="flex justify-between w-full items-center">
            <CardItem translateZ={20} className="flex gap-1">
              {Array.from({ length: rating ?? 0 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="size-4 text-yellow-500"
                  fill="currentColor"
                />
              ))}
            </CardItem>
            <CardItem className="flex items-center">
              <UsersIcon className="size-4 mr-1" />
              {teamSize ?? "N/A"}
            </CardItem>
          </div>

          {/* Date & Max Registrations */}
          <div className="flex justify-between w-full items-center mt-2 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-4" />
              <span>{date}</span>
            </div>
            {maxRegistration ? (
              bookedTickets && bookedContingents ? (
                <div className="flex items-center font-medium">
                  <TicketsIcon className="size-4 mr-1" />
                  {bookedTickets.length + bookedContingents.length} /{" "}
                  {maxRegistration}
                </div>
              ) : (
                <Skeleton className="w-[60px] h-6 animate-pulse" />
              )
            ) : null}
          </div>

          {/* Price & Select Button */}
          <div className="flex justify-between items-center mt-auto">
            <CardItem translateZ={20} className="text-sm dark:text-white">
              {price === "Free" ? "Free" : <>₹{price}</>}
            </CardItem>
            <Button
              disabled={
                totalTicketsBooked === maxRegistration ||
                isUserTicketLoading ||
                userTicket
              }
              variant="outline"
              className={cn(
                "h-8 px-4 flex items-center justify-center text-sm",
                totalTicketsBooked === maxRegistration &&
                  !userTicket &&
                  "bg-red-100/80 border border-red-500 text-red-600",
                selectedEvents.some((e) => e.title === event.title) &&
                  "bg-red-100/80 border border-red-500 text-red-600"
              )}
              onClick={() => {
                setSelectedEvents((prev) =>
                  prev.some((e) => e.title === event.title)
                    ? prev.filter((e) => e.title !== event.title)
                    : [...prev, event]
                );
                toast.success("Event list updated");
              }}
            >
              {isUserTicketLoading ? (
                "Loading"
              ) : userTicket ? (
                "Booked"
              ) : totalTicketsBooked === maxRegistration ? (
                "Maxed out"
              ) : selectedEvents.some((e) => e.title === event.title) ? (
                <>
                  <TrashIcon className="size-4 mr-1" />
                  <p>Remove</p>
                </>
              ) : (
                "Add to ticket"
              )}
            </Button>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

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
import { format, parseISO } from "date-fns";
import { trpc } from "@/trpc/client";
import { Skeleton } from "./ui/skeleton";

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
  const { data: bookedTickets } = trpc.tickets.getByEventTitle.useQuery({
    title,
  });

  const { data: userTicket } = trpc.tickets.getByEventTitleUserId.useQuery({
    title,
  });

  // Fix: Ensure bookedTickets is defined before checking length
  const isDisabled =
    bookedTickets && maxRegistration
      ? bookedTickets.length >= maxRegistration
      : false;

  return (
    <CardContainer className="inter-var cursor-pointer -mt-20 bg-white/20">
      <CardBody
        className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] 
        w-[300px] md:w-[300px] h-auto min-h-[380px] sm:h-[380px] rounded-xl p-4 border flex flex-col"
      >
        {/* Title */}
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 tracking-wide dark:text-white"
        >
          {title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>

        {/* Image */}
        <CardItem translateZ="100" className="w-full mt-4 flex-grow">
          <Image
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="1000"
            width="1000"
            className="h-[140px] w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>

        {/* Event Details Section */}
        <div className="mt-4 flex flex-col flex-grow">
          {/* Rating & Team Size */}
          <div className="flex justify-between w-full items-center">
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl text-sm font-normal flex items-center dark:text-white"
            >
              {Array.from({ length: rating }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="size-4 text-yellow-500"
                  fill="currentColor"
                />
              ))}
            </CardItem>
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl text-sm font-normal flex items-center dark:text-white"
            >
              <UsersIcon className="mr-1 size-4" />
              {teamSize}
            </CardItem>
          </div>

          {/* Date & Max Registrations */}
          <div className="flex justify-between w-full items-center mt-2 px-2 text-xs text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-4" />
              <span>
                {date ? format(parseISO(date), "dd MMM yyyy") : "No Date"}
              </span>
            </div>
            {maxRegistration ? (
              bookedTickets ? (
                <div className="text-right flex items-center text-xs font-medium">
                  <TicketsIcon className="size-4.5 mr-1" />{" "}
                  {bookedTickets.length} / {maxRegistration}
                </div>
              ) : (
                <Skeleton className="w-[60px] h-6 animate-shimmer" />
              )
            ) : null}
          </div>

          {/* Price & Select Button */}
          <div className="flex justify-between items-center mt-auto">
            <CardItem
              translateZ={20}
              className="px-4 py-2 rounded-xl text-sm font-normal dark:text-white"
            >
              {price === "Free" ? "Free" : <>₹{price}</>}
            </CardItem>
            <Button
              disabled={isDisabled || userTicket || userTicket === undefined} // Fix: Ensure correct check for userTicket
              variant="outline"
              className={cn(
                "bg-green-200/80 h-8 text-green-600 hover:text-green-600 border border-green-500 hover:bg-green-100/80",
                isDisabled &&
                  !userTicket &&
                  "bg-red-100/80 border border-red-500 hover:text-red-500 text-red-600 hover:bg-red-100/80",
                selectedEvents.some((e) => e.title === event.title) &&
                  "bg-red-100/80 border border-red-500 hover:text-red-500 text-red-600 hover:bg-red-100/80"
              )}
              onClick={() => {
                setSelectedEvents((prev) => {
                  if (prev.some((e) => e.title === event.title)) {
                    return prev.filter((e) => e.title !== event.title);
                  } else {
                    return [...prev, event];
                  }
                });
                toast.success("Event list updated");
              }}
            >
              {userTicket === undefined ? (
                "Loading"
              ) : userTicket ? (
                "Booked"
              ) : isDisabled ? (
                "Maxed out"
              ) : selectedEvents.some((e) => e.title === event.title) ? (
                <>
                  <TrashIcon />
                  <p>Remove</p>
                </>
              ) : (
                "Select"
              )}
            </Button>
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

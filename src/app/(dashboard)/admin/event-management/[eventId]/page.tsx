"use client";
import {
  CalendarIcon,
  DownloadIcon,
  InfoIcon,
  MapPin,
  PenBoxIcon,
  TicketIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/transparent-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import EventUpdateForm from "../components/event-update-form";

const EventIdPage = () => {
  const { eventId } = useParams();

  const event = useQuery(api.events.getEvent, {
    eventId: eventId as Id<"events">,
  });

  if (!event) return;

  return (
    <div className="rounded-lg min-h-screen">
      <div className="flex flex-col md:flex-row gap-y-6 gap-x-8 p-0 md:p-3">
        {/* Event Image */}
        <div className="aspect-video w-full md:w-[400px] rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 shadow-md" />

        {/* Event Details */}
        <div className="flex flex-col gap-y-4 p-3 md:p-0">
          {/* Title and Description */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 flex items-center">
              {event?.eventName}{" "}
              <EventUpdateForm
                eventId={event._id}
                eventName={event.eventName}
                eventCardDescription={event.eventCardDescription}
                eventVenue={event.eventVenue}
                ticketPrice={event.ticketPrice}
              >
                <PenBoxIcon className="size-6 ml-3" />
              </EventUpdateForm>
            </h1>
            <p className="mt-2 text-gray-600">{event?.eventCardDescription}</p>
          </div>

          {/* Date and Location */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-x-2">
              <CalendarIcon className="w-5 h-5 text-gray-600" />
              <p className="text-gray-800">{event?.eventDate}</p>
            </div>
            <Link
              href="https://maps.app.goo.gl/DWt147x2xojzJN1w8"
              target="_blank"
              className="flex items-center gap-x-2 text-blue-600 hover:underline"
            >
              <MapPin className="w-5 h-5" />
              <p>{event?.eventVenue}</p>
            </Link>
          </div>

          {/* Attendees and Info Dialog */}
          <div className="flex items-center gap-x-3">
            <UsersIcon className="w-5 h-5 text-gray-600" />
            <span className="text-gray-800">+260</span>
            <Dialog>
              <DialogTrigger>
                <InfoIcon className="w-5 h-5 text-blue-800 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="bg-white border shadow-lg rounded-lg p-4 max-w-xs">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium text-gray-800">
                    Attendees Information
                  </DialogTitle>
                  <DialogDescription className="text-sm text-gray-600">
                    Shows the count of people attending the event.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* Ticket Price and Brochure */}
          <div className="flex justify-between md:justify-start mt-auto items-center gap-x-4">
            <Button className="relative flex items-center gap-x-2 bg-green-600">
              <TicketIcon className="w-5 h-5 text-white" />
              <Separator orientation="vertical" className="h-5" />
              <span className="text-white font-medium">
                ₹{event?.ticketPrice}
              </span>
            </Button>

            <Button variant="outline" className="flex items-center gap-x-2">
              <DownloadIcon className="w-5 h-5 text-gray-600" />
              <span>Brochure</span>
            </Button>
          </div>
        </div>
      </div>

      <Separator className="my-8" />
    </div>
  );
};

export default EventIdPage;

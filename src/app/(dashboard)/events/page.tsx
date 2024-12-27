"use client";
import { Separator } from "@/components/ui/separator";
import React, { useRef, useEffect } from "react";
import EventCard from "./_components/event-card";
import { api } from "../../../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const EventsPage = () => {
  const {
    results: events,
    loadMore,
    status,
  } = usePaginatedQuery(
    api.events.getEvents,
    {},
    {
      initialNumItems: 6,
    }
  );

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loaderNode = loaderRef.current; // Capture the ref value

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && status === "CanLoadMore") {
          loadMore(6);
        }
      },
      {
        root: null, // Observe in the viewport
        rootMargin: "0px",
        threshold: 1.0, // Trigger when the loader is fully visible
      }
    );

    if (loaderNode) {
      observer.observe(loaderNode);
    }

    return () => {
      if (loaderNode) {
        observer.unobserve(loaderNode); // Use the captured value
      }
    };
  }, [status, loadMore]);

  if (events.length === 0) {
    return (
      <div className="h-full">
        <header>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-sm text-neutral-600 mt-2">
            Join us in the events and enjoy unforgettable moments!
          </p>
        </header>
        <Separator className="my-6" />
        <div className="flex justify-center items-center w-full">
          <div className="flex md:flex-row flex-col justify-center md:justify-start items-center flex-wrap gap-x-7 gap-y-10">
            <Skeleton className="w-[300px] h-[350px] rounded-lg bg-neutral-200" />
            <Skeleton className="w-[300px] h-[350px] rounded-lg bg-neutral-200" />
            <Skeleton className="w-[300px] h-[350px] rounded-lg bg-neutral-200" />
            <Skeleton className="w-[300px] h-[350px] rounded-lg bg-neutral-200" />
            <Skeleton className="w-[300px] h-[350px] rounded-lg bg-neutral-200" />
            <Skeleton className="w-[300px] h-[350px] rounded-lg bg-neutral-200" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold">Events</h1>
        <p className="text-sm text-neutral-600 mt-2">
          Join us in the events and enjoy unforgettable moments!
        </p>
      </header>
      <Separator className="my-6" />
      <div className="flex justify-center items-center w-full">
        <div className="flex md:flex-row flex-col justify-center md:justify-start items-center flex-wrap gap-x-7 gap-y-10">
          {events.map((event) => {
            return (
              <EventCard
                ticketPrice={event.ticketPrice}
                key={event._id as string}
                _id={event._id}
                eventName={event.eventName}
                eventCardDescription={event.eventCardDescription}
                eventDate={event.eventDate}
                eventVenue={event.eventVenue}
                _creationTime={event._creationTime}
              />
            );
          })}
        </div>
      </div>
      <div
        ref={loaderRef}
        className="h-20 w-full flex justify-center items-center"
      >
        {status === "LoadingMore" && (
          <LoaderIcon className="animate-spin text-green-800" />
        )}
      </div>
    </div>
  );
};

export default EventsPage;

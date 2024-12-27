"use client";
import React, { useEffect, useRef } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Separator } from "@/components/ui/separator";
import { LoaderIcon } from "lucide-react";
import { DataTable } from "./components/data-table";
import { columns, Event } from "./components/columns";
import { usePaginatedQuery } from "convex/react";
import { Skeleton } from "@/components/ui/skeleton";

const EventTableSkeleton = () => {
  return (
    <div className="">
      <div className="flex items-center py-4">
        <Skeleton className="w-1/3 bg-neutral-200 h-10 mt-auto" />
      </div>
      <Skeleton className="min-h-screen w-full bg-neutral-200" />
    </div>
  );
};

const EventManagement = () => {
  const {
    results: events,
    loadMore,
    status,
  } = usePaginatedQuery(
    api.events.getEvents,
    {},
    {
      initialNumItems: 10,
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

  if (!events) return;

  const formattedEvents: Event[] = events.map((event) => ({
    eventId: event._id,
    eventName: event.eventName,
    eventDate: event.eventDate,
    eventVenue: event.eventVenue,
    eventCardDescription: event.eventCardDescription,
    ticketPrice: event.ticketPrice,
  }));

  return (
    <div className="">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-sm text-neutral-600 mt-2">
            Join us in the events and enjoy unforgettable moments!
          </p>
        </div>
      </header>
      <Separator className="my-6" />
      <div className="flex flex-col gap-y-4">
        {events.length === 0 ? (
          <EventTableSkeleton />
        ) : (
          <DataTable columns={columns} data={formattedEvents} />
        )}
        <div
          className="w-full h-20 flex justify-center items-center"
          ref={loaderRef}
        >
          {status === "LoadingMore" && (
            <LoaderIcon className="animate-spin size-5 text-green-800" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventManagement;

"use client";
import React, { useEffect, useRef } from "react";
import EventCard from "./_components/event-card";
import { api } from "../../../../convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import { Spinner } from "@radix-ui/themes";

const EventsPage = () => {
  const { results, loadMore, status } = usePaginatedQuery(
    api.events.getEvents,
    {},
    {
      initialNumItems: 9,
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

  if (!results) return;

  return (
    <div className="space-y-2">
      <header className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Events</h1>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Discover and explore our curated events.
            </p>
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-white rounded-lg shadow-sm p-6">
        <div className="w-full flex justify-start flex-wrap gap-y-14 pb-40">
          {results.map((event) => {
            return (
              <EventCard
                id={event._id}
                key={event._id}
                name={event.name}
                description={event.description}
                venue={event.venue}
                date={event.date}
                price={event.price}
              />
            );
          })}
        </div>
        <div
          className="w-full h-20 flex justify-center items-center"
          ref={loaderRef}
        >
          {status === "LoadingMore" && (
            <Spinner className="animate-spin text-green-800" size={"3"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

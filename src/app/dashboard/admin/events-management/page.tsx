"use client";
import React, { useEffect, useRef } from "react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Spinner } from "@radix-ui/themes";

const EventsManagemenPage = () => {
  const { results, loadMore, status } = usePaginatedQuery(
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

  if (results.length === 0) {
    return (
      <div className="space-y-2">
        <div className="relative overflow-hidden p-6 rounded-xl h-28 shadow-sm border bg-white">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-neutral-400/30  to-transparent blur-2xl bg-[length:200%_200%] animate-shimmer" />
        </div>
        <div className="relative overflow-hidden min-h-screen p-6 rounded-xl shadow-sm border bg-white">
          {/* Shimmer Effect */}
          <div className="absolute delay-300 inset-0 bg-gradient-to-br from-transparent via-neutral-400/30  to-transparent blur-2xl bg-[length:200%_200%] animate-shimmer" />
        </div>
      </div>
    );
  }

  console.log(results);

  return (
    <div className="space-y-2">
      <header className="bg-white p-6 rounded-xl h-28 shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">
              Manage Events
            </h1>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Create and edit events
            </p>
          </div>
          <div></div>
        </div>
      </header>
      <ScrollArea className="bg-white rounded-lg pb-40">
        <DataTable columns={columns} data={results} />
        <ScrollBar orientation="horizontal" />
        <div
          className="w-full h-20 flex justify-center items-center"
          ref={loaderRef}
        >
          {status === "LoadingMore" && (
            <Spinner className="animate-spin text-green-800" size={"3"} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EventsManagemenPage;

"use client";
import EventsContainer from "@/components/events-container";
import React, { useState } from "react";
import { EventTypeComboBox } from "./_components/event-type-combo-box";

const EventsPage = () => {
  const [eventType, setEventType] = useState<"elysian" | "solaris">("elysian");

  return (
    <div className="px-4 md:px-12 space-y-4 pb-[1000px] ">
      <div className="min-h-20 border-b mt-1 flex justify-between items-center pr-2 flex-wrap gap-2 sm:flex-nowrap sm:gap-0">
        <div>
          <EventTypeComboBox
            eventType={eventType}
            setEventType={setEventType}
          />
          <p className="pl-3 text-muted-foreground">
            {eventType === "elysian"
              ? "Explore our cultural fest"
              : "Explore our management fest"}
          </p>
        </div>
      </div>
      <EventsContainer eventType={eventType} />
    </div>
  );
};

export default EventsPage;

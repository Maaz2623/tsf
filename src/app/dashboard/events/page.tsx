import React from "react";
import EventCard from "./_components/event-card";

const EventsPage = () => {
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
        <div className="w-full flex justify-start flex-wrap gap-y-14 gap-x-10">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

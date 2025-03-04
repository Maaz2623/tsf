import EventsContainer from "@/components/events-container";
import PageHeader from "@/components/page-header";
import React from "react";

const EventsPage = () => {
  return (
    <div className="px-4 space-y-4 pb-[1000px]">
      <PageHeader title="Events" description="Explore all our events" />
      <EventsContainer />
    </div>
  );
};

export default EventsPage;

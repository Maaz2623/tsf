import { Doc } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";

const EventCard = (event: Doc<"events">) => {
  return (
    <Link
      href={`/events/${event._id}`}
      className="w-[300px] relative hover:shadow-2xl transition-all duration-200 cursor-pointer h-[350px] bg-gradient-to-b from-green-100 to-white rounded-lg shadow-lg overflow-hidden"
    >
      <div className="aspect-video bg-gray-300">
        {/* Placeholder for an image */}
      </div>
      <div className="p-4 flex flex-col ">
        <div className="flex-grow">
          <h2 className="font-semibold md:text-md lg:text-xl text-gray-800">
            {event.eventName}
          </h2>
          <p className="lg:text-sm text-xs text-neutral-500 mt-1">
            {event.eventDate}, {event.eventVenue}
          </p>
          <p className="lg:text-sm text-xs text-neutral-600 mt-2">
            {event.eventCardDescription}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;

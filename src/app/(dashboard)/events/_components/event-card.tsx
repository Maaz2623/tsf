"use client";

import { useRouter } from "next/navigation";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { BsCartCheck, BsCartPlus } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";

const EventCard = (event: Doc<"events">) => {
  const [addedToCart, setAddedToCard] = useState(false);

  const router = useRouter();

  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Add to cart functionality goes here
    if (addedToCart) return toast.error("Already in cart");
    toast.success("Added to cart");
    setAddedToCard(true);

    console.log(`Added event ${event._id} to cart`);
  };

  return (
    <div
      onClick={() => router.push(`/events/${event._id}`)}
      className="w-[300px] relative hover:shadow-2xl transition-all duration-200 cursor-pointer h-[350px] bg-gradient-to-b from-green-100 to-white rounded-lg shadow-lg overflow-hidden"
    >
      <div
        onClick={handleIconClick}
        className="z-50 p-2 shadow-md flex justify-center items-center absolute top-3 right-3 bg-neutral-100 rounded-full"
      >
        {addedToCart ? (
          <BsCartCheck strokeWidth={0.4} className="size-5" />
        ) : (
          <BsCartPlus strokeWidth={0.4} className="size-5" />
        )}
      </div>
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
    </div>
  );
};

export default EventCard;

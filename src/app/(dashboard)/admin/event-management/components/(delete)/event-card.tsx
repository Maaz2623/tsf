"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Doc } from "../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../convex/_generated/api";

const EventCard = (event: Doc<"events">) => {
  const router = useRouter();

  const { user } = useUser();

  const likesCountQuery = useQuery(api.likes.getLikes, {
    eventId: event._id,
  });

  const like = useMutation(api.likes.like);

  const initialLikesCount = likesCountQuery?.length as number;

  const currentUser = useQuery(api.users.getCurrentUser, {
    userId: user?.id as string,
  });

  let existingLike = likesCountQuery?.some(
    ({ userId }) => userId === currentUser?._id
  );

  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      setLiked(true);
      existingLike = true;
      await like({
        userId: user?.id as string,
        eventId: event._id,
      });
      console.log("clicked");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-[300px]  hover:shadow-2xl transition-all duration-200 cursor-pointer h-[350px] bg-gradient-to-b from-green-100 to-white rounded-lg shadow-lg overflow-hidden">
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
          <div className="lg:mt-4 md:mt-6 mt-8 flex gap-x-2">
            <Button
              onClick={() =>
                router.push(`/admin/event-management/${event._id}`)
              }
              size="sm"
              className="h-9 bg-gradient-to-br from-green-700 hover:text-white hover:bg-green-600 to-green-500 text-white"
              variant={`outline`}
            >
              <p className="text-xs">Join Now</p>
            </Button>
            <div className="relative">
              <Button
                onClick={handleLike}
                size="sm"
                className="relative bg-rose-50"
                variant="ghost"
              >
                <HeartIcon
                  className={cn(
                    "text-rose-500 transition-colors duration-300",
                    (liked || existingLike) && "fill-current"
                  )}
                />
                <span className="absolute -top-2 -right-2 transition-all duration-300 bg-white border p-1 text-xs rounded-full size-5 text-neutral-800 flex justify-center items-center">
                  {initialLikesCount}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;

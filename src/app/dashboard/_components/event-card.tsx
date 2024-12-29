"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const EventCard = () => {
  return (
    <div className="h-[280px] relative group overflow-hidden w-[229px] bg-gray-500 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer">
      {/* Event Title on Top */}
      <div
        className={cn(
          "absolute text-white tracking-wide top-0 left-0 text-xl z-10 p-3 -translate-y-4 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0 font-semibold"
        )}
      >
        Event Name
      </div>

      {/* Description Section */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full text-sm text-white h-20 flex justify-center p-2 items-center z-20"
        )}
      >
        <div className="backdrop-blur-md py-1 px-2 w-full rounded-full flex justify-start items-center translate-y-4  opacity-0  duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-100 ">
          <Button
            variant={`ghost`}
            size={`icon`}
            className="hover:bg-white/5 hover:text-white rounded-full"
          >
            <InfoIcon className="hover:text-white" />
          </Button>
        </div>
      </div>

      {/* Background Image */}
      <Image
        quality={50}
        src={`/nature-1.jpg`}
        alt="nature"
        width={400}
        height={400}
        className="object-cover h-full w-full group-hover:scale-110 transition-all duration-300 object-center"
      />

      {/* Backdrop Layer */}
      <div
        className={cn(
          "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}
      />
    </div>
  );
};

export default EventCard;

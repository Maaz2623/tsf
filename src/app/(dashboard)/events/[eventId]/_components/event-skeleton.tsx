import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  DownloadIcon,
  InfoIcon,
  MapPin,
  TicketIcon,
  UsersIcon,
} from "lucide-react";
import Script from "next/script";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { DialogDescription } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const EventSkeleton = () => {
  return (
    <div className="rounded-lg min-h-screen">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex flex-col md:flex-row gap-y-6 gap-x-8 p-0 md:p-3">
        {/* Event Image */}
        <Skeleton className="aspect-video w-full md:w-[400px] rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 shadow-md" />

        {/* Event Details */}
        <div className="flex flex-col gap-y-4 p-3 md:p-0">
          {/* Title and Description */}
          <div>
            <Skeleton className="bg-gray-500 text-3xl font-semibold text-gray-800 h-10 w-[300px]" />
            <Skeleton className="mt-2 text-gray-600 h-8 w-[200px] bg-gray-500" />
          </div>

          {/* Date and Location */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Skeleton className="flex items-center gap-x-2 w-[100px] h-10" />
            <Skeleton className="flex items-center gap-x-2 text-blue-600 hover:underline h-10 w-[100px]" />
          </div>

          {/* Attendees and Info Dialog */}

          {/* Ticket Price and Brochure */}
          <Skeleton className="flex justify-between md:justify-start mt-auto items-center gap-x-4 bg-gray-500 h-10 w-2/3" />
        </div>
      </div>
      <Separator className="my-8" />
    </div>
  );
};

export default EventSkeleton;
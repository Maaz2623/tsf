"use client";
import React, { useEffect, useState } from "react";
import { RatingsCombobox } from "./combo-box";
import { ThreeDCardDemo } from "./three-d-card-demo";
import { contingentPrice, events } from "@/constants";
import { Button } from "./ui/button";
import QRCode from "react-qr-code";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export interface EventType {
  title: string;
  description: string;
  rating: number;
  price: number;
  teamSize: number;
}

const EventsContainer = () => {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);

  const [price, setPrice] = useState(0);

  useEffect(() => {
    const totalPrice = selectedEvents.reduce(
      (acc, event) => acc + event.price,
      0
    );
    setPrice(totalPrice);
  }, [selectedEvents]);

  const upiLink = `upi://pay?pa=masiddique.mm@oksbi&pn=MohammedMaaz&tn=ODER123&am=${price}&cu=INR`;

  const contingentUpiLink = `upi://pay?pa=masiddique.mm@oksbi&pn=MohammedMaaz&tn=ODER123&am=${contingentPrice}&cu=INR`;

  // Filter events based on selected rating
  const filteredEvents =
    selectedRating === "All" || !selectedRating
      ? events
      : events.filter((event) => event.rating === Number(selectedRating));

  return (
    <div className="space-y-4">
      <div className="h-14 flex px-0 md:px-12 justify-between items-center w-full">
        <RatingsCombobox
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
        />

        <div className="gap-x-2 flex ">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="py-3 rounded-lg shadow-md">
                Buy Contingent
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <VisuallyHidden>
                  <AlertDialogTitle className="w-full text-center">
                    Payment
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </VisuallyHidden>
              </AlertDialogHeader>
              <div className="min-h-40 flex justify-center items-center">
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md relative">
                  <h2 className="text-lg font-medium mb-2">
                    Scan or Click to Pay{" "}
                    <span className="font-bold text-black">
                      ₹{contingentPrice}
                    </span>
                  </h2>
                  <Link href={contingentUpiLink}>
                    <div className="relative">
                      {/* QR Code */}
                      <QRCode
                        value={contingentUpiLink}
                        size={150}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        className="rounded-lg"
                      />
                    </div>
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 text-center text-wrap w-3/4">
                    Use any upi payments provider to pay the amount
                  </p>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="py-3 rounded-lg shadow-md"
                disabled={price === 0}
              >
                Buy Ticket
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <VisuallyHidden>
                  <AlertDialogTitle className="w-full text-center">
                    Payment
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </VisuallyHidden>
              </AlertDialogHeader>
              <div className="min-h-40 flex justify-center items-center">
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md relative">
                  <h2 className="text-lg font-medium mb-2">
                    Scan or Click to Pay{" "}
                    <span className="font-bold text-black">₹{price}</span>
                  </h2>
                  <Link href={upiLink}>
                    <div className="relative">
                      {/* QR Code */}
                      <QRCode
                        value={upiLink}
                        size={150}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        className="rounded-lg"
                      />
                    </div>
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 text-center text-wrap w-3/4">
                    Use any upi payments provider to pay the amount
                  </p>
                </div>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-8 justify-center">
        {filteredEvents.map((event, i) => (
          <ThreeDCardDemo
            event={event}
            key={i}
            selectedEvents={selectedEvents}
            setSelectedEvents={setSelectedEvents}
            teamSize={event.teamSize}
            rating={event.rating}
            title={event.title}
            description={event.description}
            price={event.price}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsContainer;

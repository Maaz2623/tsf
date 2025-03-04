"use client";
import React, { useEffect, useState } from "react";
import { RatingsCombobox } from "./combo-box";
import { ThreeDCardDemo } from "./three-d-card-demo";
import { events } from "@/constants";
import { Button } from "./ui/button";
import QRCode from "react-qr-code";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
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

interface EventType {
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
        <Dialog>
          <DialogTrigger asChild>
            <Button className="">Buy Ticket</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg p-6 rounded-xl shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-center text-2xl font-bold">
                Ticket Counter
              </DialogTitle>
              <VisuallyHidden>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </VisuallyHidden>
            </DialogHeader>
            <ScrollArea className="h-[200px] border rounded-lg p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-center mb-3">
                Select Events
              </h2>
              <div className="space-y-3">
                {events.map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
                  >
                    <Checkbox
                      className="w-5 h-5"
                      checked={selectedEvents.some(
                        (e) => e.title === event.title
                      )}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedEvents((prev) => [...prev, event]);
                        } else {
                          setSelectedEvents((prev) =>
                            prev.filter((e) => e.title !== event.title)
                          );
                        }
                      }}
                    />

                    <p className="text-base">{event.title}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <DialogFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="w-full py-3 rounded-lg shadow-md"
                    disabled={price === 0}
                    onClick={() => console.log(selectedEvents)}
                  >
                    Calculate and Pay
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <VisuallyHidden>
                      <AlertDialogTitle className="w-full text-center">
                        Payment
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </VisuallyHidden>
                  </AlertDialogHeader>
                  <div className="min-h-40 flex justify-center items-center">
                    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md relative">
                      <h2 className="text-lg font-semibold mb-2">
                        Scan or Click to Pay
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
                          {/* Amount overlay */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="bg-white px-2 py-1 rounded-md text-black font-semibold text-xl shadow-md">
                              ₹{price}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <p className="text-sm text-gray-600 mt-2 text-center">
                        Scan or click the QR code to pay ₹{price}
                      </p>
                    </div>
                  </div>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap gap-x-8 justify-center">
        {filteredEvents.map((event, i) => (
          <ThreeDCardDemo
            key={i}
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

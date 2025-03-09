"use client";
import React, { useEffect, useRef, useState } from "react";
import { RatingsCombobox } from "./combo-box";
import { ThreeDCardDemo } from "./three-d-card-demo";
import { events, solarisEvents } from "@/constants";
import { Button } from "./ui/button";
import QRCode from "react-qr-code";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useUploadThing } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const EventsContainer = ({
  eventType,
}: {
  eventType: "elysian" | "solaris";
}) => {
  const [selectedRating, setSelectedRating] = useState<string | null>(null);

  const [selectedEvents, setSelectedEvents] = useState<EventType[]>([]);

  const [price, setPrice] = useState(0);

  const [ticketGeneratorOpen, setTicketGeneratorOpen] = useState(false);

  const formattedEvents = selectedEvents.map((event) => ({
    ...event,
    date: event.date ? "TBA" : undefined,
  }));

  useEffect(() => {
    const totalPrice = selectedEvents.reduce(
      (acc, event) => acc + event.price,
      0
    );
    setPrice(totalPrice);
  }, [selectedEvents]);

  const upiLink = `upi://pay?pa=7349323005@pthdfc&pn=TheStudentForum&am=${price}&cu=INR`;

  // Filter events based on selected rating
  const filteredEvents =
    eventType === "elysian"
      ? selectedRating === "All" || !selectedRating
        ? events
        : events.filter((event) => event.rating === Number(selectedRating))
      : selectedRating === "All" || !selectedRating
      ? solarisEvents
      : solarisEvents.filter(
          (event) => event.rating === Number(selectedRating)
        );

  return (
    <>
      <TicketGenerator
        eventType={eventType}
        selectedEvents={formattedEvents}
        ticketGeneratorOpen={ticketGeneratorOpen}
        setTicketGeneratorOpen={setTicketGeneratorOpen}
      />
      <div className="space-y-4">
        <div className="h-14 flex  justify-between items-center w-full">
          <RatingsCombobox
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />

          <div className="gap-x-2 flex ">
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
                      Use any UPI payments provider to pay the amounts
                    </p>
                    <p className="text-sm font-medium text-green-600 mt-2 text-center w-3/4">
                      Note: By purchasing, you get access to{" "}
                      {selectedEvents.length} events you selected.
                    </p>
                  </div>
                </div>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button onClick={() => setTicketGeneratorOpen(true)}>
                    I have paid
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 justify-center">
          {filteredEvents.map((event, i) => (
            <ThreeDCardDemo
              maxRegistration={event.maxRegistration}
              date={event.date}
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
    </>
  );
};

export default EventsContainer;

const TicketGenerator = ({
  ticketGeneratorOpen,
  selectedEvents,
  setTicketGeneratorOpen,
  eventType,
}: {
  selectedEvents: EventType[];
  eventType: "elysian" | "solaris";
  ticketGeneratorOpen: boolean;
  setTicketGeneratorOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [image, setImage] = useState<string | null>(null);

  const [newImageUrl, setNewImageUrl] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      toast.success("Upload complete");
      setNewImageUrl(res[0].ufsUrl);
    },
    onUploadError: () => {
      toast.error("Upload error");
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      startUpload([file]);
      console.log("Selected file:", file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const createTicket = trpc.tickets.createTicket.useMutation();

  const utils = trpc.useUtils();

  const router = useRouter();

  const handleCreateTicket = async () => {
    const mutationPromise = createTicket.mutateAsync(
      {
        phoneNumber: phoneNumber,
        paymentScreenshotUrl: newImageUrl,
        events: selectedEvents,
        festType: eventType,
      },
      {
        onSuccess: () => {
          router.push(`/dashboard/tickets`);
          setTicketGeneratorOpen(false);
          utils.tickets.getByClerkId.invalidate();
          utils.tickets.invalidate();
        },
      }
    );

    toast.promise(mutationPromise, {
      loading: "Generating ticket",
      success: "Ticket generated",
      error: "Ticket generation failed",
    });
  };

  return (
    <Drawer onOpenChange={setTicketGeneratorOpen} open={ticketGeneratorOpen}>
      <DrawerContent className="mb-8">
        <DrawerHeader>
          <DrawerTitle className="w-full text-center text-2xl">
            Generate Ticket
          </DrawerTitle>
          <VisuallyHidden>
            <DrawerDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DrawerDescription>
          </VisuallyHidden>
        </DrawerHeader>
        <div className="min-h-40 space-y-4 w-full flex flex-col justify-center items-center">
          <div>
            <div className="space-y-1 w-[300px]">
              <Label>Phone Number</Label>
              <Input
                placeholder="e.g. 829647***1"
                maxLength={10}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 p-6  border-dotted border-2 rounded-lg">
            {image ? (
              <div className="flex flex-col justify-center items-center space-y-2">
                <p className="text-center text-lg font-semibold">
                  Payment Screenshot
                </p>
                <div className="relative size-28">
                  <XIcon
                    onClick={() => setImage(null)}
                    className="size-5 absolute -top-1 -right-2 shadow-md bg-white rounded-lg border"
                  />
                  <Image
                    src={image}
                    alt="ss"
                    width={200}
                    height={200}
                    className="aspect-square border shadow-sm rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700 text-lg font-medium text-center">
                  Upload payment screenshot for verification
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*" // Allows only image files
                />
                <Button
                  className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
                  onClick={handleUploadClick}
                >
                  <UploadIcon className="w-5 h-5" />
                  Upload
                </Button>
              </>
            )}
          </div>
          <div className="w-full flex justify-center items-center">
            <Accordion type="single" collapsible className="w-[300px]">
              <AccordionItem
                value="item-1"
                className="bg-neutral-200 px-4 rounded-lg"
              >
                <AccordionTrigger>Events List</AccordionTrigger>
                <AccordionContent>
                  {selectedEvents.map((item, i) => (
                    <p key={i}>
                      {item.title} -{" "}
                      <span className="text-neutral-700">₹{item.price}</span>
                    </p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="w-full flex justify-center items-center">
            <Button
              className="w-[300px]"
              onClick={handleCreateTicket}
              disabled={
                selectedEvents.length === 0 ||
                !image ||
                isUploading ||
                createTicket.isPending ||
                phoneNumber.length === 0
              }
            >
              {isUploading && "Uploading screenshot"}
              {!isUploading && !createTicket.isPending && "Verify"}
              {createTicket.isPending && "Generating..."}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

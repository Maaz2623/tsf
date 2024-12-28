"use client";
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
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { DialogDescription } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import TicketPaymentDialog from "./_components/ticket-payment-dialog";
import TicketDialog from "./_components/ticket-dialog";
import EventSkeleton from "./_components/event-skeleton";
import { useUserProvider } from "@/components/convex-user-provider";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

const EventIdPage = () => {
  const { eventId } = useParams();
  const event = useQuery(api.events.getEvent, {
    eventId: eventId as Id<"events">,
  });

  const createTicket = useMutation(api.tickets.createTicket);
  const { clerkUser, convexUser, loading } = useUserProvider();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [ticketDialog, setTicketDialog] = useState(false);
  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState("");

  const existingTicket = useQuery(api.tickets.getTicket, {
    userId: clerkUser?.id as string,
    eventId: event?._id as Id<"events">,
  });

  if (!event || !clerkUser) return <EventSkeleton />;

  const AMOUNT = event.ticketPrice;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: AMOUNT,
        }),
      });
      const data = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "The Student Forum",
        description: `Ticket purchase for ${event.eventName} event`,
        order_id: data.orderId,
        prefill: {
          name: clerkUser.fullName,
          email: clerkUser.email,
          contact: clerkUser.phoneNumber,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          try {
            if (existingTicket) return;

            setIsProcessing(true);
            setTicketDialog(true); // Open dialog when payment starts

            if (!response.razorpay_payment_id || !response.razorpay_order_id) {
              throw new Error("Invalid payment response");
            }

            const ticket = await createTicket({
              eventId: event._id,
              userId: clerkUser.id,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });

            if (!ticket) return;

            setUniqueCode(ticket.uniqueCode); // Set the unique code
            setPaymentId(ticket.paymentId);
            toast.success("Ticket generated successfully!");
          } catch (error) {
            console.error("Error while generating ticket:", error);
            toast.error("Error while generating ticket. Please try again.");
          } finally {
            setIsProcessing(false);
          }
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Failed", error);
      router.push(`/payment/error`);
      setIsProcessing(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-lg min-h-screen">
      <TicketPaymentDialog
        paymentId={paymentId}
        open={ticketDialog}
        setOpen={setTicketDialog}
        isProcessing={isProcessing}
        uniqueCode={uniqueCode}
      />
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="flex flex-col md:flex-row gap-y-6 gap-x-8 p-0 md:p-3">
        {/* Event Image */}
        <div className="aspect-video w-full md:w-[400px] rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 shadow-md" />

        {/* Event Details */}
        <div className="flex flex-col gap-y-4 p-3 md:p-0">
          {/* Title and Description */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
              {event.eventName}
            </h1>
            <p className="mt-2 text-gray-600">{event.eventCardDescription}</p>
          </div>

          {/* Date and Location */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-x-2">
              <CalendarIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <p className="text-gray-800">{event.eventDate}</p>
            </div>
            <Link
              href="https://maps.app.goo.gl/DWt147x2xojzJN1w8"
              target="_blank"
              className="flex items-center gap-x-2 text-blue-400 dark:text-gray-400 hover:underline"
            >
              <MapPin className="w-5 h-5" />
              <p>{event.eventVenue}</p>
            </Link>
          </div>

          {/* Attendees and Info Dialog */}
          <div className="flex items-center gap-x-3">
            <UsersIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-gray-800">+260</span>
            <Dialog>
              <DialogTrigger>
                <InfoIcon className="w-5 h-5 text-blue-800 cursor-pointer" />
              </DialogTrigger>
              <DialogContent className="border shadow-lg rounded-lg p-4 max-w-xs">
                <DialogHeader>
                  <DialogTitle className="text-lg font-medium text-gray-800 dark:text-gray-200">
                    Attendees Information
                  </DialogTitle>
                  <DialogDescription className="text-sm ">
                    Shows the count of people attending the event.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

          {/* Ticket Price and Brochure */}
          <div className="flex justify-between md:justify-start mt-auto items-center gap-x-4">
            {!!existingTicket ? (
              <TicketDialog
                paymentId={existingTicket.paymentId}
                uniqueCode={existingTicket.uniqueCode}
              >
                <Button className="relative flex items-center gap-x-2">
                  <TicketIcon className="w-5 h-5" />
                  <Separator orientation="vertical" className="h-5" />
                  <span className="font-medium">Show Ticket</span>
                </Button>
              </TicketDialog>
            ) : (
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="relative flex items-center gap-x-2 dark:text-black"
              >
                <TicketIcon className="w-5 h-5 text-white" />
                <Separator orientation="vertical" className="h-5" />
                <span className="text-white font-medium">₹{AMOUNT}</span>
              </Button>
            )}
            <Button
              disabled={isProcessing}
              variant="outline"
              className="flex items-center gap-x-2"
            >
              <DownloadIcon className="w-5 h-5 text-gray-600" />
              <span>Brochure</span>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
    </div>
  );
};

export default EventIdPage;

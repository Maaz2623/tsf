import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "Step 1: Browse Events",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Explore upcoming events on our platform and add your favorites to your ticket. Yes! You can purchase a single ticket for multiple events.
          </p>
          <Image
            src="/help/browse-events.png"
            alt="Browse events"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full shadow-lg"
          />
        </div>
      ),
    },
    {
      title: "Step 2: Buying Your Tickets",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Click Buy Ticket, scan the QR with your UPI app, or tap it to open
            your UPI provider. Complete the payment and save the transaction
            screenshot.
          </p>
          <Image
            src="/help/payment.png"
            alt="Select tickets"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full shadow-lg"
          />
        </div>
      ),
    },
    {
      title: "Step 3: Generating Ticket",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            After payment, return to the site, click `I have paid`, fill in your
            details, upload the payment screenshot, and click `Verify` to
            generate your ticket.
          </p>
          <Image
            src="/help/form.png"
            alt="Payment options"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full shadow-lg"
          />
        </div>
      ),
    },
    {
      title: "Step 4: About Ticket Status",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Your ticket is generated but awaits TSF verification (up to 24 hrs).
            Check its status on the tickets page. While in process, you can
            still use the QR code. If rejected, generate a new ticket using the
            same payment screenshot.
          </p>
          <Image
            src="/help/ticket.png"
            alt="E-ticket"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full shadow-lg"
          />
        </div>
      ),
    },
    {
      title: "Step 5: Attend the Event",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
            Attend the event on the allotted date and show your e-ticket QR at
            the venue for entry. Find it under the Ticket QR column on the
            tickets page. Keep it handy—take a screenshot. Enjoy the event! Do
            not share your ticket QR with anyone except the members of TSF.
          </p>
          <Image
            src="/help/ticket-QR.png"
            alt="Event entry"
            width={500}
            height={300}
            className="rounded-lg object-cover w-full shadow-lg"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}

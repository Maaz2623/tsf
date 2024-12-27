import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { badgeVariants } from "@/components/ui/badge";

import QRCode from "qrcode";
import toast from "react-hot-toast";
import Image from "next/image";
import { DialogDescription } from "@/components/transparent-dialog";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

const TicketDialog = ({
  children,
  paymentId,
  uniqueCode,
}: {
  children: React.ReactNode;
  paymentId: string;
  uniqueCode: string;
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const { user } = useUser();

  const ticket = useQuery(api.tickets.getTicketByPaymentId, {
    userId: user?.id as string,
    paymentId: paymentId,
  });

  useEffect(() => {
    if (uniqueCode) {
      QRCode.toDataURL(uniqueCode)
        .then((url) => setQrCodeUrl(url))
        .catch((err) => toast.error("QR Generation Failed", err));
    }
  }, [uniqueCode]);

  if (!ticket || !user) return null; // Ensure no undefined return

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-lg w-[90%] shadow-lg p-8 bg-white">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-semibold text-gray-800 w-full text-center">
            {uniqueCode ? "Ticket Details" : "Error"}
          </DialogTitle>
          <DialogDescription className="w-full text-center">
            <span
              className={`${badgeVariants({ variant: `${ticket.burnt ? "destructive" : "default"}` })} rounded-md h-8 text-lg`}
            >
              {ticket.burnt ? "Redeemed" : "Active"}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          {uniqueCode && qrCodeUrl && (
            <div className="w-full flex flex-col items-center space-y-4">
              <Image
                src={qrCodeUrl}
                alt="Ticket QR Code"
                width={500}
                height={500}
                className="rounded-lg h-40 w-40 border-4 border-gray-200 shadow-xl"
              />
              <p className="text-lg text-gray-700 font-semibold">{paymentId}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;

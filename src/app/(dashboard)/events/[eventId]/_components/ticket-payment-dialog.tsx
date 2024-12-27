"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/transparent-dialog";
import { Loader } from "lucide-react";
import QRCode from "qrcode";
import toast from "react-hot-toast";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { DialogDescription } from "@/components/ui/dialog";
import { badgeVariants } from "@/components/ui/badge";

const TicketPaymentDialog = ({
  open,
  setOpen,
  isProcessing,
  uniqueCode,
  paymentId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isProcessing: boolean;
  uniqueCode: string | null;
  paymentId: string;
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

  if (!user || !ticket) return;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-lg shadow-lg p-8 bg-white w-[90%]">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-semibold text-gray-800 w-full text-center ">
            {isProcessing
              ? "Processing Payment"
              : uniqueCode
                ? "Ticket QR"
                : "Error"}
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
          {isProcessing && (
            <Loader className="animate-spin text-green-600 mb-4" />
          )}
          {uniqueCode && qrCodeUrl && (
            <div className="w-full flex flex-col items-center space-y-4">
              <Image
                src={qrCodeUrl}
                alt="Ticket QR Code"
                width={500}
                height={500}
                className="rounded-lg border-4 border-gray-200 shadow-xl h-40 w-40"
              />
              <p className="text-lg text-gray-700 font-semibold">{paymentId}</p>
            </div>
          )}
          {!isProcessing && !uniqueCode && (
            <p className="text-red-500 font-medium mt-4">
              Something went wrong. Try again!
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketPaymentDialog;

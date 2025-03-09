"use client";

import { useEffect, useRef, useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { toast } from "react-hot-toast";
import { trpc } from "@/trpc/client";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

const QRScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const codeReader = useRef<BrowserQRCodeReader | null>(null);

  const [ticketId, setTicketId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Fetch ticket details based on the scanned ticket ID
  const { data, isFetching } = trpc.tickets.getByTicketId.useQuery(
    { ticketId },
    { enabled: !!ticketId }
  );

  const ticket = data?.tickets;
  const user = data?.users;

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera not supported.");
      return;
    }

    let active = true;
    codeReader.current = new BrowserQRCodeReader();

    const startScanner = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        streamRef.current = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        codeReader.current?.decodeFromStream(
          mediaStream,
          videoRef.current!,
          (result) => {
            if (result && active && result.getText() !== ticketId) {
              setTicketId(result.getText());
              toast.success("QR Code Scanned!");
            }
          }
        );
      } catch (err) {
        setError("Failed to access camera. Check permissions.");
        console.error("Camera error:", err);
      }
    };

    startScanner();

    return () => {
      active = false;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      codeReader.current = null;
    };
  }, [ticketId]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-lg">
      {error ? (
        <p className="text-red-500 font-semibold">{error}</p>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            className="w-[300px] h-[300px] border-2 border-gray-300 rounded-lg shadow-md"
          />
          {isFetching ? (
            <p className="text-blue-500 font-semibold">Fetching details...</p>
          ) : ticket ? (
            <div className="p-4 bg-green-100 border border-green-500 rounded-lg w-full max-w-md">
              <h2 className="text-green-700 font-bold text-lg text-center">
                Ticket Details
              </h2>
              <div className="mt-2 text-gray-700 space-y-2">
                <p>
                  <span className="font-semibold">Ticket ID:</span>{" "}
                  {ticket.ticketId}
                </p>
                <p>
                  <span className="font-semibold">Status:</span> {ticket.status}
                </p>
                <p>
                  <span className="font-semibold">Fest Type:</span>{" "}
                  {ticket.festType}
                </p>
                <p>
                  <span className="font-semibold">Phone Number:</span>{" "}
                  {ticket.phoneNumber}
                </p>
                <p>
                  <span className="font-semibold">User Name:</span> {user?.name}
                </p>
                <p>
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>

                {/* Events */}
                <div>
                  <p className="font-semibold">Event Details:</p>
                  <ScrollArea className="h-60">
                    <div className="space-y-3">
                      {ticket.events.map((event, i) => (
                        <div key={i} className="p-3 bg-gray-100 rounded-md">
                          <p className="text-sm font-medium text-gray-800">
                            {event.title}
                          </p>
                          <p className="text-xs text-gray-600">
                            {event.description}
                          </p>
                          <p className="text-xs text-gray-700 mt-1">
                            Price:{" "}
                            <span className="font-semibold">
                              ₹{event.price}
                            </span>
                          </p>
                          {event.date && (
                            <p className="text-xs text-gray-500">
                              Date: {new Date(event.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                {/* Payment Screenshot */}
                {ticket.paymentScreentshotUrl && (
                  <div className="mt-3">
                    <span className="font-semibold">Payment Screenshot:</span>
                    <Image
                      src={ticket.paymentScreentshotUrl}
                      alt="Payment Screenshot"
                      className="w-full mt-2 rounded-md shadow"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            ticketId && (
              <p className="text-red-500 font-semibold">
                No ticket found for ID: {ticketId}
              </p>
            )
          )}
        </>
      )}
    </div>
  );
};

export default QRScanner;

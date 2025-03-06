"use client";
import QRScanner from "./qr-scanner";

const TicketVerifier = () => {
  return (
    <div className="px-6 py-3">
      <QRScanner />
    </div>
  );
};

export default TicketVerifier;

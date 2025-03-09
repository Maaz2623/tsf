"use client";
import { useState } from "react";
import ContingentQrScanner from "./contingent-qr-scanner";
import QRScanner from "./qr-scanner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TicketVerifier = () => {
  const [value, setValue] = useState<"ticket" | "contingent">("ticket");

  return (
    <div className="px-6 py-3 space-y-4 mb-[500px]">
      <div className="flex w-full justify-center items-center">
        <Select
          value={value}
          onValueChange={(val) => setValue(val as "ticket" | "contingent")}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select scanner type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ticket">Ticket</SelectItem>
            <SelectItem value="contingent">Contingent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {value === "ticket" && <QRScanner />}
      {value === "contingent" && <ContingentQrScanner />}
    </div>
  );
};

export default TicketVerifier;

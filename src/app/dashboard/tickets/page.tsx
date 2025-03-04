import { HydrateClient } from "@/trpc/server";
import React from "react";

const TicketsPage = async () => {
  return (
    <HydrateClient>
      <div>TicketsPage</div>
    </HydrateClient>
  );
};

export default TicketsPage;

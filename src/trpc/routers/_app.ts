import { ticketsRouter } from "@/server/tickets.procedure";
import { createTRPCRouter } from "../init";
import { contingentsRouter } from "@/server/contingent.procedure";
export const appRouter = createTRPCRouter({
  tickets: ticketsRouter,
  contingents: contingentsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;

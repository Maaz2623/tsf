import { ticketsRouter } from "@/server/tickets.procedure";
import { createTRPCRouter } from "../init";
export const appRouter = createTRPCRouter({
  tickets: ticketsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;

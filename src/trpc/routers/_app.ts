import { ticketsRouter } from "@/server/tickets.procedure";
import { createTRPCRouter } from "../init";
import { contingentsRouter } from "@/server/contingent.procedure";
import { userRouter } from "@/server/users.procedure";
export const appRouter = createTRPCRouter({
  tickets: ticketsRouter,
  contingents: contingentsRouter,
  users: userRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;

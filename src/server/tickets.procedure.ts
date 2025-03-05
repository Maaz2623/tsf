import { db } from "@/db";
import { tickets } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const ticketsRouter = createTRPCRouter({
  getByTicketId: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [data] = await db
        .select()
        .from(tickets)
        .where(eq(tickets.ticketId, input.ticketId))
        .limit(1);

      if (!data) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return data;
    }),
  getByClerkId: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.clerkUserId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }

    const data = await db
      .select()
      .from(tickets)
      .where(eq(tickets.clerkId, ctx.clerkUserId));

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return data;
  }),
  createTicket: protectedProcedure
    .input(
      z.object({
        paymentScreenshotUrl: z.string(),
        events: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            rating: z.number(),
            price: z.number(),
            teamSize: z.number().optional(),
            maxRegistration: z.number().optional(),
            date: z.coerce.date().optional(),
          })
        ),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.clerkUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const [newTicket] = await db
        .insert(tickets)
        .values({
          status: "processing",
          paymentScreentshotUrl: input.paymentScreenshotUrl,
          events: input.events,
          email: input.email,
          clerkId: ctx.clerkUserId,
        })
        .returning();

      return newTicket;
    }),
});

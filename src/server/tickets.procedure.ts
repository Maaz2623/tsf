import { db } from "@/db";
import { tickets, users } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export const ticketsRouter = createTRPCRouter({
  updatedStatus: protectedProcedure
    .input(
      z.object({
        ticketId: z.string(),
        value: z.enum(["pending", "processing", "verified", "rejected"]),
      })
    )
    .mutation(async ({ input }) => {
      const [data] = await db
        .update(tickets)
        .set({
          status: input.value,
        })
        .where(eq(tickets.ticketId, input.ticketId))
        .returning();

      return data;
    }),
  getAllTickets: protectedProcedure.query(async () => {
    const data = await db
      .select({
        ticket: tickets,
        user: users,
      })
      .from(tickets)
      .orderBy(desc(tickets.createdAt))
      .leftJoin(users, eq(users.id, tickets.userId));

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return data.map(({ ticket, user }) => ({
      ...ticket,
      user, // Embed user details inside the ticket object
    }));
  }),
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
        .leftJoin(users, eq(users.id, tickets.userId))
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
      .where(eq(tickets.userId, ctx.user.id))
      .orderBy(desc(tickets.createdAt));

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
        festType: z.enum(["elysian", "solaris"]),
        events: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            rating: z.number(),
            price: z.number(),
            teamSize: z.number().optional(),
            maxRegistration: z.number().optional(),
            date: z.string().optional(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.clerkUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const updatedEvents = input.events.map((event) => ({
        ...event,
        festType: input.festType,
      }));

      const [newTicket] = await db
        .insert(tickets)
        .values({
          festType: input.festType,
          status: "processing",
          paymentScreentshotUrl: input.paymentScreenshotUrl,
          events: updatedEvents,
          userId: ctx.user.id,
        })
        .returning();

      return newTicket;
    }),
});

import { db } from "@/db";
import { contingents, users } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";

export const contingentsRouter = createTRPCRouter({
  getBookedContingents: protectedProcedure
    .input(
      z.object({
        title: z.string(),
      })
    )
    .query(async () => {
      const data = await db.select().from(contingents);

      return data;
    }),
  hasContingent: protectedProcedure.query(async ({ ctx }) => {
    const [data] = await db
      .select()
      .from(contingents)
      .where(eq(contingents.userId, ctx.user.id));

    if (data) {
      return true;
    }

    return false;
  }),
  updatedStatus: protectedProcedure
    .input(
      z.object({
        contingentId: z.string(),
        value: z.enum(["pending", "processing", "verified", "rejected"]),
      })
    )
    .mutation(async ({ input }) => {
      const [data] = await db
        .update(contingents)
        .set({
          status: input.value,
        })
        .where(eq(contingents.id, input.contingentId))
        .returning();

      return data;
    }),
  getAllContingents: protectedProcedure.query(async () => {
    const data = await db
      .select({
        contingent: contingents,
        user: users,
      })
      .from(contingents)
      .orderBy(desc(contingents.createdAt))
      .leftJoin(users, eq(users.id, contingents.userId));

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return data.map(({ contingent, user }) => ({
      ...contingent,
      user,
    }));
  }),
  getByContingentId: protectedProcedure
    .input(
      z.object({
        contingentId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [data] = await db
        .select()
        .from(contingents)
        .where(eq(contingents.id, input.contingentId))
        .leftJoin(users, eq(users.id, contingents.userId))
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
      .from(contingents)
      .orderBy(desc(contingents.createdAt))
      .where(eq(contingents.userId, ctx.user.id));

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return data;
  }),
  createContingent: protectedProcedure
    .input(
      z.object({
        paymentScreenshotUrl: z.string(),
        name: z.string(),
        collegeName: z.string(),
        festType: z.enum(["elysian", "solaris"]),
        phoneNumber: z.string().max(10),
        events: z.array(
          z.object({
            festType: z.enum(["elysian", "solaris"]),
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

      const [newContingent] = await db
        .insert(contingents)
        .values({
          phoneNumber: input.phoneNumber,
          festType: input.festType,
          status: "processing",
          collegeName: input.collegeName,
          paymentScreentshotUrl: input.paymentScreenshotUrl,
          events: updatedEvents,
          userId: ctx.user.id,
          name: input.name,
        })
        .returning();

      return newContingent;
    }),
});

import { db } from "@/db";
import { contingents } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const contingentsRouter = createTRPCRouter({
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
    const data = await db.select().from(contingents);

    if (!data) {
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    }

    return data;
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
      .where(eq(contingents.clerkId, ctx.clerkUserId));

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
        orderId: z.string(),
        collegeName: z.string(),
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

      if (ctx.user.role !== "admin") {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const [newContingent] = await db
        .insert(contingents)
        .values({
          status: "processing",
          collegeName: input.collegeName,
          paymentScreentshotUrl: input.paymentScreenshotUrl,
          events: input.events,
          email: input.email,
          clerkId: ctx.clerkUserId,
          orderId: input.orderId,
        })
        .returning();

      return newContingent;
    }),
});

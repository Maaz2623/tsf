import { db } from "@/db";
import { users } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  checkIsAdmin: protectedProcedure.query(async ({ ctx }) => {
    const data = ctx.user;

    if (data.role !== "admin") {
      return false;
    } else {
      return true;
    }
  }),
  getUserByClerkId: protectedProcedure.query(async ({ ctx }) => {
    const data = ctx.user;

    if (!data) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return data;
  }),
  updateUserByClerkId: protectedProcedure
    .input(
      z.object({
        phoneNumber: z.string().max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.clerkUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const [updatedUser] = await db
        .update(users)
        .set({
          phoneNumber: input.phoneNumber,
        })
        .where(eq(users.clerkId, ctx.clerkUserId))
        .returning();

      return updatedUser;
    }),
});

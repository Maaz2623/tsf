import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getUserByClerkId: protectedProcedure.query(async ({ ctx }) => {
    const data = ctx.user;

    if (!data) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return data;
  }),
});

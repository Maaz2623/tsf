import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const like = mutation({
  args: {
    userId: v.string(),
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const convexAccount = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!convexAccount) return;

    const existingLike = await ctx.db
      .query("likes")
      .withIndex("by_user_and_event", (q) =>
        q.eq("userId", convexAccount._id).eq("eventId", args.eventId)
      )
      .first();

    if (existingLike)
      return {
        liked: true,
      };

    if (!existingLike) {
      await ctx.db.insert("likes", {
        userId: convexAccount._id,
        eventId: args.eventId,
      });
      return {
        liked: true,
      };
    }
  },
});

export const getLikes = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const likes = await ctx.db
      .query("likes")
      .withIndex("by_event_id", (q) => q.eq("eventId", args.eventId))
      .collect();

    return likes; // Simply return the count of likes
  },
});

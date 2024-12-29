import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    label: v.string(),
    location: v.string(),
    date: v.number(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.insert("events", {
      name: args.name,
      description: args.description,
      venue: {
        label: args.label,
        location: args.location,
      },
      date: args.date,
      price: args.price,
    });

    return event;
  },
});

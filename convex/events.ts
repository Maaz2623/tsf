import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    label: v.string(),
    location: v.string(),
    date: v.string(),
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

export const getEvents = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const data = await ctx.db
      .query("events")
      .order("desc")
      .paginate(args.paginationOpts);

    return data;
  },
});

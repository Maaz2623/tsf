import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getEvents = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const events = await ctx.db
      .query("events")
      .order("desc")
      .paginate(args.paginationOpts);

    return events;
  },
});

export const getEvent = query({
  args: {
    eventId: v.id("events"),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);

    if (!event) return;

    return event;
  },
});

export const updateEvent = mutation({
  args: {
    eventId: v.id("events"),
    eventName: v.optional(v.string()),
    eventVenue: v.optional(v.string()),
    eventCardDescription: v.optional(v.string()),
    ticketPrice: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);

    if (!event) return;

    const updatedEvent = await ctx.db.patch(args.eventId, {
      eventName: args.eventName,
      eventVenue: args.eventVenue,
      eventCardDescription: args.eventCardDescription,
      ticketPrice: args.ticketPrice,
    });

    return updatedEvent;
  },
});

export const createEvent = mutation({
  args: {
    userId: v.string(),
    eventName: v.string(),
    eventVenue: v.string(),
    eventDate: v.number(),
    eventCardDescription: v.string(),
    ticketPrice: v.number(),
  },
  handler: async (ctx, args) => {
    const newEvent = await ctx.db.insert("events", {
      eventName: args.eventName,
      eventVenue: args.eventVenue,
      eventDate: args.eventDate,
      eventCardDescription: args.eventCardDescription,
      ticketPrice: args.ticketPrice,
    });

    return newEvent;
  },
});

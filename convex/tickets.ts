import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { v4 as uuidv4 } from "uuid";

export const createTicket = mutation({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
    paymentId: v.string(),
    orderId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) return;

    const uniqueCode = uuidv4().replace(/-/g, "");

    const ticketId = await ctx.db.insert("tickets", {
      eventId: args.eventId,
      userId: user._id,
      paymentId: args.paymentId,
      orderId: args.orderId,
      uniqueCode: uniqueCode,
      burnt: false,
    });

    const getNewTicket = await ctx.db.get(ticketId);

    return getNewTicket;
  },
});

export const getTicket = query({
  args: {
    eventId: v.id("events"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) return;

    const ticket = await ctx.db
      .query("tickets")
      .withIndex("by_user_id_by_event_id", (q) =>
        q.eq("userId", user._id).eq("eventId", args.eventId)
      )
      .first();

    if (!ticket) return;

    return ticket;
  },
});

export const burnTicket = mutation({
  args: {
    uniqueCode: v.string(),
  },
  handler: async (ctx, args) => {
    const ticket = await ctx.db
      .query("tickets")
      .withIndex("by_unique_code", (q) => q.eq("uniqueCode", args.uniqueCode))
      .first();

    if (!ticket) return;

    if (ticket.burnt) return false;

    await ctx.db.patch(ticket._id, {
      burnt: true,
    });

    return true;
  },
});

export const getTicketByPaymentId = query({
  args: {
    paymentId: v.string(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    if (!user) return;

    const ticket = await ctx.db
      .query("tickets")
      .withIndex("by_payment_id", (q) => q.eq("paymentId", args.paymentId))
      .first();

    if (!ticket) return;

    return ticket;
  },
});

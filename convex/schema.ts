import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  events: defineTable({
    name: v.string(),
    description: v.string(),
    venue: v.object({
      label: v.string(),
      location: v.string(),
    }),
    date: v.number(),
    price: v.number(),
  }),
});

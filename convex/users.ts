import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    userId: v.string(),
    imageUrl: v.string(),
    createdAt: v.float64(),
    emailAddress: v.string(),
    fullName: v.string(),
    phoneNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    enum RoleType {
      MEMBER = "MEMBER",
      ADMIN = "ADMIN",
      SUPER_ADMIN = "SUPER_ADMIN",
    }

    if (user) return;

    return await ctx.db.insert("users", {
      userId: args.userId,
      role: RoleType.MEMBER,
      imageUrl: args.imageUrl,
      banned: false,
      createdAt: Date.now(),
      emailAddress: args.emailAddress,
      fullName: args.fullName,
      phoneNumber: args.phoneNumber,
    });
  },
});

export const getCurrentUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    return currentUser;
  },
});

export const getUserById = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);

    return user;
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    return users;
  },
});

export const updateUser = mutation({
  args: {
    userId: v.string(),
    imageUrl: v.optional(v.string()),
    createdAt: v.optional(v.float64()),
    emailAddress: v.optional(v.string()),
    fullName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .first();

    enum RoleType {
      MEMBER = "MEMBER",
      ADMIN = "ADMIN",
      SUPER_ADMIN = "SUPER_ADMIN",
    }

    if (!user) return;

    return await ctx.db.patch(user._id, {
      userId: args.userId,
      role: RoleType.MEMBER,
      imageUrl: args.imageUrl,
      banned: false,
      createdAt: Date.now(),
      emailAddress: args.emailAddress,
      fullName: args.fullName,
      phoneNumber: args.phoneNumber,
    });
  },
});

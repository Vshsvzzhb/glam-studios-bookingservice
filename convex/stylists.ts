import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getStylists = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("stylists").collect();
  },
});

export const addStylist = mutation({
  args: {
    name: v.string(),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    password: v.optional(v.string()),
    role: v.optional(v.string()),
    specialties: v.array(v.string()),
    level: v.string(),
    bio: v.optional(v.string()),
    instagram: v.optional(v.string()),
    commissionRate: v.number(),
    rating: v.number(),
    avatar: v.string(),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("stylists", args);
  },
});

export const updateStylist = mutation({
  args: { 
    id: v.id("stylists"), 
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    password: v.optional(v.string()),
    role: v.optional(v.string()),
    level: v.optional(v.string()),
    bio: v.optional(v.string()),
    instagram: v.optional(v.string()),
    commissionRate: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    // only patch what is defined
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
  },
});

export const deleteStylist = mutation({
  args: { id: v.id("stylists") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getNotifications = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notifications").order("desc").collect();
  },
});

export const addNotification = mutation({
  args: {
    title: v.string(),
    message: v.string(),
    time: v.string(),
    bookingCode: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notifications", args);
  },
});

export const deleteNotification = mutation({
  args: { id: v.id("notifications") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clearAllNotifications = mutation({
  args: {},
  handler: async (ctx) => {
    const notifications = await ctx.db.query("notifications").collect();
    for (const notification of notifications) {
      await ctx.db.delete(notification._id);
    }
  },
});

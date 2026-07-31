import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getScheduleSettings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "schedule"))
      .first();
  },
});

export const updateScheduleSettings = mutation({
  args: {
    availableTimes: v.array(v.string()),
    stylistAvailability: v.any(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "schedule"))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        availableTimes: args.availableTimes,
        stylistAvailability: args.stylistAvailability,
      });
    } else {
      await ctx.db.insert("settings", {
        key: "schedule",
        availableTimes: args.availableTimes,
        stylistAvailability: args.stylistAvailability,
      });
    }
  },
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBookings = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("bookings").order("desc").collect();
  },
});

export const addBooking = mutation({
  args: {
    bookingCode: v.string(),
    customerName: v.string(),
    customerPhone: v.string(),
    customerEmail: v.string(),
    stylistId: v.string(),
    stylistName: v.string(),
    bookingDate: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    services: v.array(
      v.object({
        id: v.string(),
        categoryId: v.string(),
        categoryName: v.string(),
        name: v.string(),
        description: v.string(),
        price: v.number(),
        duration: v.number(),
      })
    ),
    totalAmount: v.number(),
    notes: v.string(),
    status: v.string(),
    createdAt: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", args);
  },
});

export const updateBookingStatus = mutation({
  args: { id: v.id("bookings"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

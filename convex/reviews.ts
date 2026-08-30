import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 1. Get all customer reviews (sorted by creation time)
export const getReviews = query({
  args: {},
  handler: async (ctx) => {
    const reviews = await ctx.db.query("reviews").order("desc").collect();
    return reviews;
  },
});

// 2. Add a new customer review
export const addReview = mutation({
  args: {
    customerName: v.string(),
    customerPhone: v.optional(v.string()),
    treatment: v.optional(v.string()),
    rating: v.number(),
    review: v.string(),
  },
  handler: async (ctx, args) => {
    const reviewId = await ctx.db.insert("reviews", {
      customerName: args.customerName,
      customerPhone: args.customerPhone || "-",
      treatment: args.treatment || "General Service",
      rating: Math.min(5, Math.max(1, args.rating)),
      review: args.review,
      createdAt: new Date().toISOString(),
      isApproved: true,
    });
    return reviewId;
  },
});

// 3. Delete a review (Admin)
export const deleteReview = mutation({
  args: { id: v.id("reviews") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

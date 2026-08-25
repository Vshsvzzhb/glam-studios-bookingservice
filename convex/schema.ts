import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  stylists: defineTable({
    name: v.string(),
    email: v.optional(v.string()), // For login & contact
    phone: v.optional(v.string()), // WhatsApp / Username
    password: v.optional(v.string()),
    role: v.optional(v.string()), // 'admin' | 'stylist'
    
    // Info Profesional
    specialties: v.array(v.string()),
    level: v.string(), // 'Junior' | 'Senior' | 'Master'
    bio: v.optional(v.string()),
    instagram: v.optional(v.string()),
    
    // Metrik & Status
    commissionRate: v.number(),
    rating: v.number(),
    avatar: v.string(),
    isActive: v.optional(v.boolean()), // Ready/Off or Employed/Resigned
  }),

  bookings: defineTable({
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
    status: v.string(), // 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
    createdAt: v.string(),
  }),

  notifications: defineTable({
    title: v.string(),
    message: v.string(),
    time: v.string(),
    bookingCode: v.string(),
    createdAt: v.string(),
  }),

  users: defineTable({
    username: v.string(),
    password: v.string(),
    name: v.string(),
    role: v.string(), // 'owner' | 'kasir'
  }).index("by_username", ["username"]),

  settings: defineTable({
    key: v.string(), // e.g. "schedule"
    availableTimes: v.array(v.string()),
    stylistAvailability: v.any(), // Record<string, string[]>
  }).index("by_key", ["key"]),
});

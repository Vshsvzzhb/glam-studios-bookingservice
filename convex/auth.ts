import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    // Check users table
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
      
    if (user && user.password === args.password) {
      return { success: true, role: user.role, name: user.name };
    }
    
    // Fallback for initial admin if users table is empty
    const allUsers = await ctx.db.query("users").collect();
    if (allUsers.length === 0) {
      if (args.username === 'admin' && args.password === 'admin123') {
        return { success: true, role: 'owner', name: 'Admin' };
      }
    }
    
    return { success: false };
  }
});

import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    // Simple backend auth verification (hides passwords from client bundle)
    if (args.username === 'admin' && args.password === 'admin123') {
      return { success: true, role: 'owner', name: 'Admin' };
    }
    if (args.username === 'staff' && args.password === 'staff123') {
      return { success: true, role: 'kasir', name: 'Staff Umum' };
    }
    
    // Check if it's a stylist logging in with phone and password
    const stylists = await ctx.db.query("stylists").collect();
    const stylist = stylists.find(s => 
      (s.phone === args.username || s.name.toLowerCase() === args.username.toLowerCase()) 
      && s.password === args.password
    );
    if (stylist) {
      return { success: true, role: 'kasir', name: stylist.name };
    }
    
    return { success: false };
  }
});

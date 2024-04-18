
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("coupons").collect();
  },
});

export const getOneById = query({
  args: {
    id: v.id("coupons"),
  },
  handler: async (ctx, args) => {
    const coupon = await ctx.db.get(args.id);
    return coupon
  },
});


export const createOne = mutation({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("coupons", { code: args.code });
  },
});

import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getOneById = query({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const coupon = await ctx.db.get(args.id);
    return coupon
  },
});


export const createOne = mutation({
  args: { productName: v.string(), productDescription: v.string(), userId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const productId = await ctx.db.insert("products", {
      productName: args.productName,
      productDescription: args.productDescription,
      userId: args.userId
    });
  },
});
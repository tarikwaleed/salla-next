
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
  args: {
    age: v.number(),
    type: v.string(),
    weight: v.number(),
    userId: v.optional(v.string()),
    storageIds: v.array(v.string()),
  },

  handler: async (ctx, args) => {
    const productId = await ctx.db.insert("products", {
      age: args.age,
      type: args.type,
      weight: args.weight,
      userId: args.userId,
      storageIds: args.storageIds
    });
    return productId
  },
});
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    productDescription: v.string(),
    productName: v.string(),
    userId: v.optional(v.string())
  }),
});
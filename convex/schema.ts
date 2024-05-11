import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    age: v.number(),
    type: v.string(),
    weight: v.number(),
    userId: v.optional(v.string()),
    storageIds: v.array(v.string()),
  }),
});
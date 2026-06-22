import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    name: v.string(),
    slug: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    sortOrder: v.number(),
  }).index("by_slug", ["slug"]),

  products: defineTable({
    name: v.string(),
    slug: v.string(),
    categoryId: v.id("categories"),
    description: v.optional(v.string()),
    price: v.number(),
    imageUrl: v.optional(v.string()),
    isAvailable: v.boolean(),
    isMadeToOrder: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"]),

  orders: defineTable({
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("preparing"),
      v.literal("ready"),
      v.literal("delivered"),
      v.literal("cancelled"),
    ),
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    deliveryType: v.union(
      v.literal("delivery"),
      v.literal("pickup"),
      v.literal("fast_delivery"),
    ),
    deliveryAddress: v.optional(v.string()),
    notes: v.optional(v.string()),
    items: v.array(
      v.object({
        productId: v.id("products"),
        productName: v.string(),
        quantity: v.number(),
        unitPrice: v.number(),
      }),
    ),
    total: v.number(),
    createdAt: v.number(),
  }).index("by_status", ["status"]),
});

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const orderItem = v.object({
  productId: v.optional(v.id("products")),
  productName: v.string(),
  quantity: v.number(),
  unitPrice: v.number(),
  productType: v.optional(
    v.union(v.literal("live"), v.literal("made_to_order")),
  ),
});

const orderStatus = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("preparing"),
  v.literal("shipped"),
  v.literal("ready_for_pickup"),
  v.literal("delivered"),
  v.literal("cancelled"),
);

const subOrder = v.object({
  kind: v.union(v.literal("live"), v.literal("made_to_order")),
  status: orderStatus,
  items: v.array(orderItem),
  deliveryFee: v.optional(v.number()),
});

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
    stockQuantity: v.optional(v.number()),
  })
    .index("by_slug", ["slug"])
    .index("by_category", ["categoryId"]),

  orders: defineTable({
    status: orderStatus,
    customerName: v.string(),
    email: v.string(),
    phone: v.string(),
    deliveryType: v.union(
      v.literal("delivery"),
      v.literal("pickup"),
      v.literal("fast_delivery"),
    ),
    paymentMethod: v.optional(
      v.union(v.literal("card"), v.literal("cash")),
    ),
    splitStrategy: v.optional(
      v.union(v.literal("partial"), v.literal("unified")),
    ),
    deliveryAddress: v.optional(v.string()),
    locality: v.optional(v.string()),
    notes: v.optional(v.string()),
    items: v.array(orderItem),
    subOrders: v.optional(v.array(subOrder)),
    subtotal: v.number(),
    deliveryFee: v.optional(v.number()),
    total: v.number(),
    createdAt: v.number(),
  }).index("by_status", ["status"]),
});

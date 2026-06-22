import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const orderItemValidator = v.object({
  productId: v.id("products"),
  productName: v.string(),
  quantity: v.number(),
  unitPrice: v.number(),
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").order("desc").collect();
  },
});

export const getById = query({
  args: { id: v.id("orders") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const create = mutation({
  args: {
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
    items: v.array(orderItemValidator),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", {
      status: "pending",
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("preparing"),
      v.literal("ready"),
      v.literal("delivered"),
      v.literal("cancelled"),
    ),
  },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const orderItemValidator = v.object({
  productId: v.optional(v.id("products")),
  productName: v.string(),
  quantity: v.number(),
  unitPrice: v.number(),
  productType: v.optional(
    v.union(v.literal("live"), v.literal("made_to_order")),
  ),
});

const orderStatusValidator = v.union(
  v.literal("pending"),
  v.literal("confirmed"),
  v.literal("preparing"),
  v.literal("shipped"),
  v.literal("ready_for_pickup"),
  v.literal("delivered"),
  v.literal("cancelled"),
);

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
    paymentMethod: v.optional(
      v.union(v.literal("card"), v.literal("cash")),
    ),
    splitStrategy: v.optional(
      v.union(v.literal("partial"), v.literal("unified")),
    ),
    deliveryAddress: v.optional(v.string()),
    locality: v.optional(v.string()),
    notes: v.optional(v.string()),
    items: v.array(orderItemValidator),
    subtotal: v.number(),
    deliveryFee: v.optional(v.number()),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    const liveItems = args.items.filter((i) => i.productType === "live");
    const madeToOrderItems = args.items.filter(
      (i) => i.productType === "made_to_order",
    );
    const isSplit =
      liveItems.length > 0 &&
      madeToOrderItems.length > 0 &&
      args.splitStrategy === "partial";

    const subOrders = isSplit
      ? [
          {
            kind: "live" as const,
            status: "pending" as const,
            items: liveItems,
            deliveryFee:
              args.deliveryType === "pickup" ? undefined : args.deliveryFee,
          },
          {
            kind: "made_to_order" as const,
            status: "pending" as const,
            items: madeToOrderItems,
            deliveryFee:
              args.deliveryType === "pickup" ? undefined : args.deliveryFee,
          },
        ]
      : undefined;

    for (const item of liveItems) {
      if (!item.productId) continue;
      const product = await ctx.db.get(item.productId);
      if (!product || product.isMadeToOrder) continue;
      if (product.stockQuantity !== undefined) {
        const nextStock = product.stockQuantity - item.quantity;
        await ctx.db.patch(item.productId, {
          stockQuantity: Math.max(0, nextStock),
          isAvailable: nextStock > 0,
        });
      }
    }

    return await ctx.db.insert("orders", {
      status: "pending",
      ...args,
      subOrders,
      createdAt: Date.now(),
    });
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("orders"),
    status: orderStatusValidator,
    subOrderKind: v.optional(
      v.union(v.literal("live"), v.literal("made_to_order")),
    ),
  },
  handler: async (ctx, { id, status, subOrderKind }) => {
    const order = await ctx.db.get(id);
    if (!order) return;

    if (subOrderKind && order.subOrders?.length) {
      const subOrders = order.subOrders.map((sub) =>
        sub.kind === subOrderKind ? { ...sub, status } : sub,
      );
      await ctx.db.patch(id, { subOrders });
      return;
    }

    await ctx.db.patch(id, { status });
  },
});

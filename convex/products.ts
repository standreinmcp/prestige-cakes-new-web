import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { toSlug } from "./lib/slug";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const listAvailable = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return products.filter((p) => {
      if (!p.isAvailable) return false;
      if (
        !p.isMadeToOrder &&
        p.stockQuantity !== undefined &&
        p.stockQuantity <= 0
      ) {
        return false;
      }
      return true;
    });
  },
});

export const listMadeToOrder = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return products.filter((p) => p.isMadeToOrder);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const listByCategory = query({
  args: { categoryId: v.id("categories") },
  handler: async (ctx, { categoryId }) => {
    return await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categoryId", categoryId))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    categoryId: v.id("categories"),
    description: v.optional(v.string()),
    price: v.number(),
    isAvailable: v.boolean(),
    isMadeToOrder: v.boolean(),
    stockQuantity: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const slug = toSlug(args.name);
    const existing = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) {
      throw new Error("Există deja un produs cu acest nume.");
    }

    if (!args.isMadeToOrder && args.stockQuantity === undefined) {
      throw new Error("Produsele din vitrină necesită stoc.");
    }

    return await ctx.db.insert("products", {
      name: args.name.trim(),
      slug,
      categoryId: args.categoryId,
      description: args.description?.trim() || undefined,
      price: args.price,
      isAvailable: args.isAvailable,
      isMadeToOrder: args.isMadeToOrder,
      stockQuantity: args.isMadeToOrder ? undefined : args.stockQuantity,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    categoryId: v.id("categories"),
    description: v.optional(v.string()),
    price: v.number(),
    isAvailable: v.boolean(),
    isMadeToOrder: v.boolean(),
    stockQuantity: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...args }) => {
    const slug = toSlug(args.name);
    const duplicate = await ctx.db
      .query("products")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (duplicate && duplicate._id !== id) {
      throw new Error("Există deja un produs cu acest nume.");
    }

    if (!args.isMadeToOrder && args.stockQuantity === undefined) {
      throw new Error("Produsele din vitrină necesită stoc.");
    }

    await ctx.db.patch(id, {
      name: args.name.trim(),
      slug,
      categoryId: args.categoryId,
      description: args.description?.trim() || undefined,
      price: args.price,
      isAvailable: args.isAvailable,
      isMadeToOrder: args.isMadeToOrder,
      stockQuantity: args.isMadeToOrder ? undefined : args.stockQuantity,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, { id }) => {
    const product = await ctx.db.get(id);
    if (!product) return;
    await ctx.db.delete(id);
  },
});

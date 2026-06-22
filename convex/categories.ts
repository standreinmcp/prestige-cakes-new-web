import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { toSlug } from "./lib/slug";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("categories").order("asc").collect();
  },
});

export const getById = query({
  args: { id: v.id("categories") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const slug = toSlug(args.name);
    const existing = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (existing) {
      throw new Error("Există deja o categorie cu acest nume.");
    }

    const categories = await ctx.db.query("categories").collect();
    const sortOrder = args.sortOrder ?? categories.length + 1;

    return await ctx.db.insert("categories", {
      name: args.name.trim(),
      slug,
      description: args.description?.trim() || undefined,
      sortOrder,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("categories"),
    name: v.string(),
    description: v.optional(v.string()),
    sortOrder: v.number(),
  },
  handler: async (ctx, { id, ...args }) => {
    const slug = toSlug(args.name);
    const duplicate = await ctx.db
      .query("categories")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .unique();
    if (duplicate && duplicate._id !== id) {
      throw new Error("Există deja o categorie cu acest nume.");
    }

    await ctx.db.patch(id, {
      name: args.name.trim(),
      slug,
      description: args.description?.trim() || undefined,
      sortOrder: args.sortOrder,
    });
  },
});

export const remove = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, { id }) => {
    const category = await ctx.db.get(id);
    if (!category) return;

    const products = await ctx.db
      .query("products")
      .withIndex("by_category", (q) => q.eq("categoryId", id))
      .collect();
    const activeProducts = products.filter((p) => p.isAvailable);
    if (activeProducts.length > 0) {
      throw new Error(
        `Nu poți șterge categoria „${category.name}” — are ${activeProducts.length} produse active.`,
      );
    }

    await ctx.db.delete(id);
  },
});

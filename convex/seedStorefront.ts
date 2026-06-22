import { mutation } from "./_generated/server";

/** Imports static vitrină + MTO products into Convex (skips existing slugs). */
export const importStorefrontCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    let categories = await ctx.db.query("categories").collect();
    if (categories.length === 0) {
      const croissante = await ctx.db.insert("categories", {
        name: "Croissante",
        slug: "croissante",
        sortOrder: 1,
      });
      const cozonaci = await ctx.db.insert("categories", {
        name: "Cozonaci",
        slug: "cozonaci",
        sortOrder: 2,
      });
      const choux = await ctx.db.insert("categories", {
        name: "Choux",
        slug: "choux",
        sortOrder: 3,
      });
      const tarte = await ctx.db.insert("categories", {
        name: "Tarte",
        slug: "tarte",
        sortOrder: 4,
      });
      const torturi = await ctx.db.insert("categories", {
        name: "Torturi",
        slug: "torturi",
        sortOrder: 5,
      });
      categories = [
        { _id: croissante, slug: "croissante" },
        { _id: cozonaci, slug: "cozonaci" },
        { _id: choux, slug: "choux" },
        { _id: tarte, slug: "tarte" },
        { _id: torturi, slug: "torturi" },
      ] as typeof categories;
    }

    const bySlug = (slug: string) =>
      categories.find((c) => c.slug === slug)?._id ?? categories[0]!._id;

    const catalog = [
      {
        name: "Croissant cu fistic",
        slug: "croissant-cu-fistic",
        categorySlug: "croissante",
        description: "Croissant franțuzesc cu fistic proaspăt...",
        portion: "70 g / o bucată.",
        price: 5.95,
        pricePerKg: 85,
        isMadeToOrder: false,
        stockQuantity: 12,
        imageUrl: "/images/home/categories.jpg",
        imagePosition: "0% 0%",
      },
      {
        name: "Tarte cu fructe",
        slug: "tarte-cu-fructe",
        categorySlug: "tarte",
        description: "Tarte artizanale cu fructe proaspete de...",
        portion: "70 g / o bucată.",
        price: 9.8,
        pricePerKg: 140,
        isMadeToOrder: false,
        stockQuantity: 6,
        imageUrl: "/images/home/categories.jpg",
        imagePosition: "100% 0%",
      },
      {
        name: "Choux cu vanilie",
        slug: "choux-cu-vanilie",
        categorySlug: "choux",
        description: "Choux umplut cu cremă de vanilie naturală...",
        portion: "250 g.",
        price: 27.5,
        pricePerKg: 110,
        isMadeToOrder: false,
        stockQuantity: 8,
        imageUrl: "/images/home/categories.jpg",
        imagePosition: "66% 0%",
      },
      {
        name: "Tort aniversare ciocolată",
        slug: "tort-aniversare-ciocolata",
        categorySlug: "torturi",
        description: "Tort cu ciocolată belgiană și fructe proaspete...",
        portion: "1.5 kg / tort.",
        price: 247.5,
        pricePerKg: 165,
        isMadeToOrder: true,
        imageUrl: "/images/home/categories.jpg",
        imagePosition: "25% 25%",
      },
    ];

    let inserted = 0;
    for (const item of catalog) {
      const existing = await ctx.db
        .query("products")
        .withIndex("by_slug", (q) => q.eq("slug", item.slug))
        .unique();
      if (existing) continue;

      await ctx.db.insert("products", {
        name: item.name,
        slug: item.slug,
        categoryId: bySlug(item.categorySlug),
        description: item.description,
        portion: item.portion,
        price: item.price,
        pricePerKg: item.pricePerKg,
        imageUrl: item.imageUrl,
        imagePosition: item.imagePosition,
        isAvailable: true,
        isMadeToOrder: item.isMadeToOrder,
        stockQuantity: item.isMadeToOrder ? undefined : item.stockQuantity,
      });
      inserted++;
    }

    return { inserted, total: catalog.length };
  },
});

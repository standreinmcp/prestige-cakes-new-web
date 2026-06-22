import { mutation } from "./_generated/server";

export const seedCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("categories").first();
    if (existing) return { seeded: false };

    const croissante = await ctx.db.insert("categories", {
      name: "Croissante",
      slug: "croissante",
      description:
        "Croissante proaspete, coapte zilnic, cu unt premium și foițe perfecte.",
      sortOrder: 1,
    });

    const cozonaci = await ctx.db.insert("categories", {
      name: "Cozonaci",
      slug: "cozonaci",
      description:
        "Cozonaci tradiționali, umpluți generos, preparați după rețete proprii.",
      sortOrder: 2,
    });

    const choux = await ctx.db.insert("categories", {
      name: "Choux",
      slug: "choux",
      description:
        "Deserturi choux fine, cu creme artizanale și finisaje elegante.",
      sortOrder: 3,
    });

    const tarte = await ctx.db.insert("categories", {
      name: "Tarte",
      slug: "tarte",
      description:
        "Tarte cu fructe proaspete și creme fine, perfecte pentru orice ocazie.",
      sortOrder: 4,
    });

    await ctx.db.insert("products", {
      name: "Croissant cu unt",
      slug: "croissant-cu-unt",
      categoryId: croissante,
      description: "Croissant clasic cu unt franțuzesc.",
      price: 12,
      isAvailable: true,
      isMadeToOrder: false,
      stockQuantity: 24,
    });

    await ctx.db.insert("products", {
      name: "Cozonac cu nucă",
      slug: "cozonac-cu-nuca",
      categoryId: cozonaci,
      description: "Cozonac tradițional cu nucă și cacao.",
      price: 85,
      isAvailable: true,
      isMadeToOrder: true,
    });

    await ctx.db.insert("products", {
      name: "Profiterol cu ciocolată",
      slug: "profiterol-ciocolata",
      categoryId: choux,
      description: "Choux umplut cu cremă de vanilie, glazurat cu ciocolată.",
      price: 28,
      isAvailable: true,
      isMadeToOrder: false,
      stockQuantity: 18,
    });

    await ctx.db.insert("products", {
      name: "Tartă cu fructe de pădure",
      slug: "tarta-fructe-padure",
      categoryId: tarte,
      description: "Tartă cu cremă de vanilie și fructe de pădure proaspete.",
      price: 45,
      isAvailable: true,
      isMadeToOrder: true,
    });

    return { seeded: true, categories: [croissante, cozonaci, choux, tarte] };
  },
});

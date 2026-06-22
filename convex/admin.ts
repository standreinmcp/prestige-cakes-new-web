import { query } from "./_generated/server";

export const dashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    const orders = await ctx.db.query("orders").collect();

    const activeProducts = products.filter((p) => p.isAvailable).length;
    const newOrders = orders.filter((o) => o.status === "pending").length;

    const salesByName = new Map<string, number>();
    for (const order of orders) {
      for (const item of order.items) {
        const current = salesByName.get(item.productName) ?? 0;
        salesByName.set(item.productName, current + item.quantity);
      }
    }

    const ranked = [...salesByName.entries()].sort((a, b) => b[1] - a[1]);
    const bestSeller = ranked[0]?.[0] ?? "—";
    const topFive = ranked.slice(0, 5).map(([name, units]) => ({ name, units }));

    return {
      activeProducts,
      newOrders,
      bestSeller,
      topFive,
      totalOrders: orders.length,
    };
  },
});

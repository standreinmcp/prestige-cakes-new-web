export type ProductType = "live" | "made_to_order";

export type SplitStrategy = "partial" | "unified";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  portion: string;
  price: number;
  quantity: number;
  imagePosition?: string;
  productType: ProductType;
  convexId?: string;
};

export type CartState = {
  items: CartItem[];
  splitStrategy: SplitStrategy | null;
};

export const DELIVERY_FEE = 11.99;

export function cartHasMixedTypes(items: CartItem[]): boolean {
  if (items.length === 0) return false;
  const hasLive = items.some((i) => i.productType === "live");
  const hasMadeToOrder = items.some((i) => i.productType === "made_to_order");
  return hasLive && hasMadeToOrder;
}

export function partitionCartItems(items: CartItem[]) {
  return {
    live: items.filter((i) => i.productType === "live"),
    madeToOrder: items.filter((i) => i.productType === "made_to_order"),
  };
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function productTypeLabel(type: ProductType): string {
  return type === "live" ? "Disponibil azi" : "1–2 zile lucrătoare";
}

/** Parse portion string (e.g. "70 g / o bucată.") to weight in kg. */
export function portionWeightKg(portion: string): number {
  const gMatch = portion.match(/(\d+(?:[.,]\d+)?)\s*g\b/i);
  if (gMatch) {
    return parseFloat(gMatch[1].replace(",", ".")) / 1000;
  }
  const kgMatch = portion.match(/(\d+(?:[.,]\d+)?)\s*kg\b/i);
  if (kgMatch) {
    return parseFloat(kgMatch[1].replace(",", "."));
  }
  return 0.07;
}

export function unitPriceFromKg(pricePerKg: number, portion: string): number {
  return pricePerKg * portionWeightKg(portion);
}

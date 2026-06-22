import type { ProductCardData } from "@/components/catalog/ProductCard";
import type { ProductDetailData } from "@/lib/product-data";

/** Shape returned from Convex product queries (subset used by mapper). */
export type ConvexProduct = {
  _id: string;
  slug: string;
  name: string;
  description?: string;
  longDescription?: string;
  portion?: string;
  price: number;
  pricePerKg?: number;
  imageUrl?: string;
  imagePosition?: string;
  isAvailable: boolean;
  isMadeToOrder: boolean;
  stockQuantity?: number;
  nutrition?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
};

const DEFAULT_PORTION_LIVE = "70 g / o bucată.";
const DEFAULT_PORTION_MTO = "La comandă.";

export function convexProductToCard(product: ConvexProduct): ProductCardData {
  const productType = product.isMadeToOrder ? "made_to_order" : "live";
  const pricePerKg = product.pricePerKg ?? product.price;

  return {
    slug: product.slug,
    name: product.name,
    description: product.description ?? "",
    portion: product.portion ?? (product.isMadeToOrder ? DEFAULT_PORTION_MTO : DEFAULT_PORTION_LIVE),
    priceLabel: product.isMadeToOrder
      ? `${pricePerKg} lei / kg`
      : `${product.price.toFixed(2)} lei`,
    imagePosition: product.imagePosition,
    productType,
    stockQuantity: product.stockQuantity,
    imageUrl: product.imageUrl,
    convexId: product._id,
    unitPrice: product.isMadeToOrder
      ? pricePerKg * portionWeightFromString(product.portion ?? DEFAULT_PORTION_MTO)
      : product.price,
  };
}

export function convexProductToDetail(product: ConvexProduct): ProductDetailData {
  const card = convexProductToCard(product);
  const pricePerKg = product.pricePerKg ?? product.price;

  return {
    ...card,
    longDescription:
      product.longDescription ??
      product.description ??
      "Produs artizanal Prestige Cakes, preparat cu ingrediente atent selectate.",
    pricePerKg,
    nutrition: product.nutrition ?? {
      calories: "—",
      protein: "—",
      carbs: "—",
      fat: "—",
    },
    imageUrl: product.imageUrl,
    convexId: product._id,
  };
}

function portionWeightFromString(portion: string): number {
  const gMatch = portion.match(/(\d+(?:[.,]\d+)?)\s*g\b/i);
  if (gMatch) return parseFloat(gMatch[1].replace(",", ".")) / 1000;
  const kgMatch = portion.match(/(\d+(?:[.,]\d+)?)\s*kg\b/i);
  if (kgMatch) return parseFloat(kgMatch[1].replace(",", "."));
  return 0.07;
}

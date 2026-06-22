import type { ProductCardData } from "@/components/catalog/ProductCard";

/** Live vitrină products with stock — hide when quantity is 0. */
export function filterAvailableLiveProducts(
  products: ProductCardData[],
): ProductCardData[] {
  return products.filter(
    (product) =>
      product.stockQuantity === undefined || product.stockQuantity > 0,
  );
}

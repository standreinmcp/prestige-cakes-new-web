import { describe, expect, it } from "vitest";
import type { ProductCardData } from "@/components/catalog/ProductCard";
import { filterAvailableLiveProducts } from "./catalog-utils";

const base = (overrides: Partial<ProductCardData>): ProductCardData => ({
  slug: "test",
  name: "Test",
  description: "Desc",
  portion: "70 g",
  priceLabel: "10 lei",
  productType: "live",
  ...overrides,
});

describe("filterAvailableLiveProducts", () => {
  it("keeps products without stock field", () => {
    expect(filterAvailableLiveProducts([base({ stockQuantity: undefined })])).toHaveLength(1);
  });

  it("keeps products with positive stock", () => {
    expect(filterAvailableLiveProducts([base({ stockQuantity: 5 })])).toHaveLength(1);
  });

  it("removes products with zero stock", () => {
    expect(filterAvailableLiveProducts([base({ stockQuantity: 0 })])).toHaveLength(0);
  });
});

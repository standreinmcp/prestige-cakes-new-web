import { describe, expect, it } from "vitest";
import {
  cartHasMixedTypes,
  cartSubtotal,
  partitionCartItems,
  portionWeightKg,
  productTypeLabel,
  unitPriceFromKg,
  type CartItem,
} from "./cart-types";

const liveItem = (slug: string): CartItem => ({
  id: slug,
  slug,
  name: slug,
  portion: "70 g / o bucată.",
  price: 10,
  quantity: 1,
  productType: "live",
});

const mtoItem = (slug: string): CartItem => ({
  id: slug,
  slug,
  name: slug,
  portion: "500 g / o bucată.",
  price: 40,
  quantity: 1,
  productType: "made_to_order",
});

describe("cartHasMixedTypes", () => {
  it("returns false for empty cart", () => {
    expect(cartHasMixedTypes([])).toBe(false);
  });

  it("returns false for single product type", () => {
    expect(cartHasMixedTypes([liveItem("a"), liveItem("b")])).toBe(false);
  });

  it("returns true when live and made-to-order are mixed", () => {
    expect(cartHasMixedTypes([liveItem("a"), mtoItem("b")])).toBe(true);
  });
});

describe("partitionCartItems", () => {
  it("splits items by product type", () => {
    const items = [liveItem("a"), mtoItem("b"), liveItem("c")];
    const { live, madeToOrder } = partitionCartItems(items);
    expect(live).toHaveLength(2);
    expect(madeToOrder).toHaveLength(1);
  });
});

describe("cartSubtotal", () => {
  it("sums price × quantity", () => {
    expect(
      cartSubtotal([
        { ...liveItem("a"), price: 5, quantity: 2 },
        { ...liveItem("b"), price: 3, quantity: 1 },
      ]),
    ).toBe(13);
  });
});

describe("portionWeightKg", () => {
  it("parses grams", () => {
    expect(portionWeightKg("70 g / o bucată.")).toBeCloseTo(0.07);
  });

  it("parses kilograms", () => {
    expect(portionWeightKg("2 kg / tort.")).toBe(2);
  });
});

describe("unitPriceFromKg", () => {
  it("computes line unit price from portion", () => {
    expect(unitPriceFromKg(100, "70 g / o bucată.")).toBeCloseTo(7);
  });
});

describe("productTypeLabel", () => {
  it("labels live and made-to-order", () => {
    expect(productTypeLabel("live")).toBe("Disponibil azi");
    expect(productTypeLabel("made_to_order")).toBe("1–2 zile lucrătoare");
  });
});

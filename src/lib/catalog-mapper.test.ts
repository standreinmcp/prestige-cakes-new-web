import { describe, expect, it } from "vitest";
import { convexProductToCard } from "./catalog-mapper";

describe("convexProductToCard", () => {
  it("maps live product with stock", () => {
    const card = convexProductToCard({
      _id: "p1",
      slug: "tarte-cu-fructe",
      name: "Tarte cu fructe",
      description: "Tarte artizanale",
      portion: "70 g / o bucată.",
      price: 9.8,
      pricePerKg: 140,
      isAvailable: true,
      isMadeToOrder: false,
      stockQuantity: 6,
    });
    expect(card.productType).toBe("live");
    expect(card.stockQuantity).toBe(6);
    expect(card.priceLabel).toContain("9.80");
  });

  it("maps made-to-order product", () => {
    const card = convexProductToCard({
      _id: "p2",
      slug: "tort-nunta",
      name: "Tort nuntă",
      description: "Tort personalizat",
      portion: "2 kg / tort.",
      price: 180,
      pricePerKg: 180,
      isAvailable: true,
      isMadeToOrder: true,
    });
    expect(card.productType).toBe("made_to_order");
    expect(card.priceLabel).toContain("lei / kg");
  });
});

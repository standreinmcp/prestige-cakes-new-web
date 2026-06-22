import { afterEach, describe, expect, it } from "vitest";
import { loadPlacedOrder, savePlacedOrder } from "./order-session";

afterEach(() => {
  sessionStorage.clear();
});

describe("order-session", () => {
  it("saves and loads placed order", () => {
    const order = {
      orderNumber: "#1234",
      placedOn: "22 Iun 2026",
      fulfillment: "Livrare la adresă",
      deliveryEstimate: "Azi",
      customer: {
        name: "Test User",
        phone: "+40 700 000 000",
        email: "test@example.com",
        address: "Str. Test 1",
        details: "—",
        orderNotes: "—",
        paymentMethod: "Numerar",
      },
      isPartialSplit: false,
      items: [{ id: "1", name: "Tartă", quantity: 1, price: 9.8 }],
      subtotal: 9.8,
      deliveryFeeTotal: 11.99,
    };

    savePlacedOrder(order);
    expect(loadPlacedOrder()).toEqual(order);
  });

  it("returns null when nothing stored", () => {
    expect(loadPlacedOrder()).toBeNull();
  });
});

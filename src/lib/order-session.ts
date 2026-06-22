export type PlacedOrder = {
  orderId?: string;
  orderNumber: string;
  placedOn: string;
  fulfillment: string;
  deliveryEstimate: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    details: string;
    orderNotes: string;
    paymentMethod: string;
  };
  isPartialSplit: boolean;
  items: { id: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  deliveryFeeTotal: number;
};

const STORAGE_KEY = "prestige-last-order";

export function savePlacedOrder(order: PlacedOrder) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
}

export function loadPlacedOrder(): PlacedOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PlacedOrder;
  } catch {
    return null;
  }
}

/** Convex order status values (English in DB, Romanian in UI). */
export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Nouă",
  confirmed: "Confirmată",
  preparing: "În preparare",
  shipped: "Expediată",
  ready_for_pickup: "Gata de ridicare",
  delivered: "Livrată",
  cancelled: "Anulată",
};

export const ORDER_STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "preparing",
  "shipped",
  "ready_for_pickup",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUS_OPTIONS)[number];

export const PICKUP_ADDRESS = "Baia Mare, Aleea Dobrogei nr. 1";
export const PICKUP_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Aleea+Dobrogei+1+Baia+Mare";

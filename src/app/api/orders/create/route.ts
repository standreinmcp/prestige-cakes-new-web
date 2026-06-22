import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

type CreateOrderBody = {
  customerName: string;
  email: string;
  phone: string;
  deliveryType: "delivery" | "pickup" | "fast_delivery";
  paymentMethod?: "card" | "cash";
  splitStrategy?: "partial" | "unified";
  deliveryAddress?: string;
  locality?: string;
  notes?: string;
  items: Array<{
    productId?: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    productType?: "live" | "made_to_order";
  }>;
  subtotal: number;
  deliveryFee?: number;
  total: number;
};

export async function POST(request: Request) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    return NextResponse.json(
      { error: "Convex is not configured" },
      { status: 503 },
    );
  }

  let body: CreateOrderBody;
  try {
    body = (await request.json()) as CreateOrderBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const client = new ConvexHttpClient(convexUrl);
    const orderId = await client.mutation(api.orders.create, {
      ...body,
      items: body.items.map((item) => ({
        productName: item.productName,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        productType: item.productType,
        ...(item.productId
          ? { productId: item.productId as Id<"products"> }
          : {}),
      })),
    });
    return NextResponse.json({ orderId });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Order creation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

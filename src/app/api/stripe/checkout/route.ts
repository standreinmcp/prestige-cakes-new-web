import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type CheckoutBody = {
  total: number;
  customerEmail?: string;
  orderId?: string;
  orderNumber?: string;
};

export async function POST(request: NextRequest) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.total || body.total <= 0) {
    return NextResponse.json({ error: "Invalid total" }, { status: 400 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      mock: true,
      url: "/checkout/confirmare?payment=card-mock",
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = request.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: body.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "ron",
          unit_amount: Math.round(body.total * 100),
          product_data: {
            name: `Comandă Prestige Cakes ${body.orderNumber ?? ""}`.trim(),
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      orderId: body.orderId ?? "",
    },
    success_url: `${origin}/checkout/confirmare?payment=card&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe session missing URL" }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}

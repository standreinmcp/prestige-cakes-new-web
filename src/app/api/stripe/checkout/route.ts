import { NextResponse } from "next/server";

type CheckoutBody = {
  total: number;
  customerEmail?: string;
  orderId?: string;
};

/**
 * Stripe Checkout Session stub.
 * With STRIPE_SECRET_KEY set, integrate real Stripe here.
 * Without keys, returns a mock redirect for local/dev testing.
 */
export async function POST(request: Request) {
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

  // Real Stripe integration placeholder — install `stripe` and create a session.
  return NextResponse.json(
    {
      error: "Stripe keys present but integration not configured yet",
    },
    { status: 501 },
  );
}

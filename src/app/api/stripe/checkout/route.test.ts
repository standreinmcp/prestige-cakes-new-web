import { describe, expect, it } from "vitest";
import { POST } from "@/app/api/stripe/checkout/route";

describe("POST /api/stripe/checkout", () => {
  it("returns mock redirect when Stripe is not configured", async () => {
    const prev = process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_SECRET_KEY;

    const response = await POST(
      new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ total: 52.46 }),
      }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.mock).toBe(true);
    expect(data.url).toContain("/checkout/confirmare");

    if (prev) process.env.STRIPE_SECRET_KEY = prev;
  });

  it("rejects invalid total", async () => {
    const response = await POST(
      new Request("http://localhost/api/stripe/checkout", {
        method: "POST",
        body: JSON.stringify({ total: 0 }),
      }),
    );
    expect(response.status).toBe(400);
  });
});

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  OrderSummary,
} from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import { orderConfirmation, checkoutItems, checkoutSummary } from "@/lib/checkout-data";
import { DELIVERY_FEE } from "@/lib/cart-types";
import { loadPlacedOrder, type PlacedOrder } from "@/lib/order-session";

export function OrderConfirmationView() {
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    setPlacedOrder(loadPlacedOrder());
  }, []);

  const order = placedOrder ?? {
    orderNumber: orderConfirmation.orderNumber,
    placedOn: orderConfirmation.placedOn,
    fulfillment: orderConfirmation.fulfillment,
    deliveryEstimate: orderConfirmation.deliveryEstimate,
    customer: orderConfirmation.customer,
    isPartialSplit: false,
    items: checkoutItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),
    subtotal: checkoutSummary.productsTotal,
    deliveryFeeTotal: checkoutSummary.deliveryFee,
  };

  const { customer } = order;
  const isPartialSplit = order.isPartialSplit;
  const summaryItems = order.items.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  }));
  const subtotal = order.subtotal;
  const deliveryFeeCount = isPartialSplit ? 2 : order.deliveryFeeTotal > 0 ? 1 : 0;

  return (
    <>
      <section className="relative h-[265px] overflow-hidden">
        <Image
          src="/images/home/hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/60" />
      </section>

      <section className="bg-white px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-[1248px]">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/20 text-3xl text-brand-gold">
              ✓
            </div>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-brand-navy">
              Comanda ta este confirmată
            </h1>
            <p className="mt-2 text-lg text-text-muted">
              Mulțumim pentru cumpărături !
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[692px_1fr]">
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-navy">
                  Comanda - {order.orderNumber}
                  {isPartialSplit ? " (+ livrare 2)" : ""}
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-4 border-y border-border-card py-4 sm:grid-cols-4">
                  {[
                    {
                      label: "Număr comadă",
                      value: order.orderNumber,
                    },
                    { label: "Plasată pe:", value: order.placedOn },
                    {
                      label: "Livrare",
                      value: isPartialSplit
                        ? "Livrare în două etape"
                        : order.fulfillment,
                    },
                    {
                      label: "Estimare Livrare",
                      value: order.deliveryEstimate,
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="text-center sm:border-l sm:first:border-l-0"
                    >
                      <p className="text-sm text-text-muted">{item.label}</p>
                      <p className="mt-2 font-medium text-brand-navy">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {isPartialSplit && (
                <div className="rounded-2xl border border-border-card bg-brand-lilac/20 p-6">
                  <h3 className="font-serif text-lg font-semibold text-brand-navy">
                    Livrare 1 — Comanda #5422
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    Produse disponibile azi · Livrare la adresă
                  </p>
                  <h3 className="mt-6 font-serif text-lg font-semibold text-brand-navy">
                    Livrare 2 — Comanda #5423
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">
                    Produse la comandă · Estimare 1–2 zile
                  </p>
                </div>
              )}

              <div>
                <h3 className="font-serif text-xl font-semibold text-brand-navy">
                  Informații Livrare
                </h3>
                <dl className="mt-4 space-y-3 text-base text-brand-navy">
                  <div>Nume: {customer.name}</div>
                  <div>Număr de telefon: {customer.phone}</div>
                  <div>Email: {customer.email}</div>
                  <div>Adresă: {customer.address}</div>
                  <div>Detalii suplimentare: {customer.details}</div>
                  <div>Detalii comandă: {customer.orderNotes}</div>
                  <div>Metodă de plată: {customer.paymentMethod}</div>
                </dl>
                <div className="mt-6 h-0.5 bg-border-card" />
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-brand-navy">
                  Intrebări despre comandă ?
                </h3>
                <Button href="/despre-noi" variant="outline" className="mt-4">
                  Contactează-ne
                </Button>
              </div>
            </div>

            <OrderSummary
              items={summaryItems}
              subtotal={subtotal}
              deliveryFee={DELIVERY_FEE}
              deliveryFeeCount={deliveryFeeCount}
              showDelivery={order.deliveryFeeTotal > 0}
            />
          </div>
        </div>
      </section>
    </>
  );
}

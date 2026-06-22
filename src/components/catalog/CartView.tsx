"use client";

import Image from "next/image";
import Link from "next/link";
import { SplitOrderChoice } from "@/components/cart/SplitOrderChoice";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import {
  cartSubtotal,
  productTypeLabel,
} from "@/lib/cart-types";

export function CartView() {
  const {
    items,
    splitStrategy,
    hasMixedTypes,
    setSplitStrategy,
    updateQuantity,
    removeItem,
    canCheckout,
  } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartSubtotal(items);

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
          <h1 className="font-serif text-4xl font-semibold text-brand-navy">
            Coșul tău ( {totalItems} produse )
          </h1>
          <p className="mt-2 text-lg text-text-muted">
            Verifică selecția înainte de finalizarea comenzii
          </p>

          {items.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-border-card bg-brand-lilac/20 px-8 py-16 text-center">
              <p className="font-serif text-2xl font-semibold text-brand-navy">
                Coșul tău este gol
              </p>
              <p className="mt-2 text-text-muted">
                Adaugă produse din vitrină sau din catalogul la comandă.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/vitrina-live" variant="primary">
                  Vitrină Live
                </Button>
                <Button href="/produse-la-comanda" variant="outline">
                  Produse la comandă
                </Button>
              </div>
            </div>
          ) : (
            <>
              {hasMixedTypes && (
                <div className="mt-8">
                  <SplitOrderChoice
                    value={splitStrategy ?? "partial"}
                    onChange={setSplitStrategy}
                  />
                </div>
              )}

              <div className="mt-12 grid gap-10 lg:grid-cols-[718px_1fr]">
            <div className="space-y-8">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="relative grid grid-cols-[150px_1fr_auto] gap-5 rounded-[22px] border border-border-card bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                >
                  <div className="relative h-[150px] w-[150px] overflow-hidden rounded-2xl">
                    <Image
                      src="/images/home/categories.jpg"
                      alt={item.name}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: item.imagePosition ?? "center",
                      }}
                      sizes="150px"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-brand-gold">
                      {productTypeLabel(item.productType)}
                    </p>
                    <h2 className="mt-1 font-serif text-[22px] font-semibold text-brand-navy">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-base text-text-muted">
                      {item.portion}
                    </p>
                    <div className="mt-6 flex h-12 w-36 items-center overflow-hidden rounded-full border border-border-card">
                      <button
                        type="button"
                        className="flex h-full w-12 items-center justify-center hover:bg-brand-lilac"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Scade cantitatea"
                      >
                        −
                      </button>
                      <span className="flex-1 text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="flex h-full w-12 items-center justify-center hover:bg-brand-lilac"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Crește cantitatea"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-border-card text-brand-navy hover:bg-brand-lilac"
                      aria-label={`Șterge ${item.name}`}
                    >
                      🗑
                    </button>
                    <p className="font-serif text-2xl font-semibold text-brand-navy">
                      {(item.price * item.quantity).toFixed(2)} lei
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-[22px] border border-border-card bg-brand-lilac/30 p-8 lg:sticky lg:top-8">
              <h2 className="font-serif text-2xl font-semibold text-brand-navy">
                Sumar comandă
              </h2>
              <dl className="mt-6 space-y-4 text-base">
                <div className="flex justify-between">
                  <dt className="text-text-muted">Subtotal</dt>
                  <dd className="font-medium text-brand-navy">
                    {subtotal.toFixed(2)} lei
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-text-muted">Livrare</dt>
                  <dd className="font-medium text-brand-navy">
                    {hasMixedTypes && splitStrategy === "partial"
                      ? "Până la 2 livrări la checkout"
                      : "Calculată la checkout"}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border-card pt-4">
                  <dt className="font-serif text-xl font-semibold text-brand-navy">
                    Total
                  </dt>
                  <dd className="font-serif text-2xl font-semibold text-brand-navy">
                    {subtotal.toFixed(2)} lei
                  </dd>
                </div>
              </dl>
              {canCheckout ? (
                <Button href="/checkout" variant="primary" className="mt-8 w-full">
                  Finalizează comanda
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="mt-8 w-full pointer-events-none opacity-50"
                >
                  Finalizează comanda
                </Button>
              )}
              <Link
                href="/vitrina-live"
                className="mt-4 block text-center text-sm font-medium text-brand-gold hover:underline"
              >
                Continuă cumpărăturile
              </Link>
            </aside>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

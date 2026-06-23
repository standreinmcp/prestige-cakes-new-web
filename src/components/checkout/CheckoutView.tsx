"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import {
  OrderSummary,
  cartItemsToSummary,
} from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import {
  DELIVERY_FEE,
  cartSubtotal,
} from "@/lib/cart-types";
import { savePlacedOrder } from "@/lib/order-session";
import { PICKUP_ADDRESS, PICKUP_MAPS_URL } from "@/lib/order-constants";

type Fulfillment = "delivery" | "pickup";
type PaymentMethod = "card" | "cash";

type CheckoutViewProps = {
  defaultFulfillment?: Fulfillment;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1 block text-sm font-medium text-brand-navy">
      {children}
    </label>
  );
}

function TextInput({
  placeholder,
  className = "",
  value,
  onChange,
}: {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`h-9 w-full rounded-lg border border-border-card bg-white px-2 text-base text-brand-navy outline-none focus:border-brand-gold ${className}`}
    />
  );
}

function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border-card px-3 py-3">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 accent-brand-gold"
      />
      <span className="text-base text-brand-navy">{label}</span>
    </label>
  );
}

export function CheckoutView({
  defaultFulfillment = "delivery",
}: CheckoutViewProps) {
  const router = useRouter();
  const { items, splitStrategy, hasMixedTypes, liveItems, madeToOrderItems, clearCart } =
    useCart();
  const [fulfillment, setFulfillment] = useState<Fulfillment>(
    defaultFulfillment,
  );
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [locality, setLocality] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cashLabel =
    fulfillment === "pickup"
      ? "Numerar la ridicarea comenzii"
      : "Numerar la livrare";

  const subtotal = cartSubtotal(items);
  const showDelivery =
    fulfillment === "delivery" && locality !== "" && locality !== "Alege localitatea";
  const isPartialSplit =
    hasMixedTypes && splitStrategy === "partial" && fulfillment === "delivery";
  const deliveryFeeCount = showDelivery ? (isPartialSplit ? 2 : 1) : 0;

  const summaryItems = cartItemsToSummary(items);
  const splitPackages =
    isPartialSplit && showDelivery
      ? [
          {
            title: "Pachet 1 — disponibil azi",
            items: cartItemsToSummary(liveItems),
          },
          {
            title: "Pachet 2 — în 1–2 zile",
            items: cartItemsToSummary(madeToOrderItems),
          },
        ]
      : undefined;

  const ctaLabel =
    payment === "cash" ? "Finalizează comanda" : "Continuă la plată";

  const canSubmit =
    termsAccepted &&
    firstName.trim() &&
    lastName.trim() &&
    phone.trim() &&
    (fulfillment === "pickup" || (address.trim() && locality));

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;

    const deliveryFeeTotal = deliveryFeeCount * DELIVERY_FEE;
    const total = subtotal + deliveryFeeTotal;
    const customerName = `${firstName.trim()} ${lastName.trim()}`;
    const paymentLabel =
      payment === "cash"
        ? fulfillment === "pickup"
          ? "Numerar la ridicare"
          : "Numerar la livrare"
        : "Card online";

    setSubmitting(true);
    try {
      let orderId: string | undefined;
      if (process.env.NEXT_PUBLIC_CONVEX_URL) {
        const orderRes = await fetch("/api/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName,
            email: email.trim() || "—",
            phone: phone.trim(),
            deliveryType: fulfillment === "pickup" ? "pickup" : "delivery",
            paymentMethod: payment,
            splitStrategy: hasMixedTypes ? splitStrategy ?? undefined : undefined,
            deliveryAddress:
              fulfillment === "delivery" ? address.trim() : undefined,
            locality: fulfillment === "delivery" ? locality : undefined,
            notes: orderNotes.trim() || undefined,
            items: items.map((item) => ({
              ...(item.convexId ? { productId: item.convexId } : {}),
              productName: item.name,
              quantity: item.quantity,
              unitPrice: item.price,
              productType: item.productType,
            })),
            subtotal,
            deliveryFee: deliveryFeeTotal > 0 ? deliveryFeeTotal : undefined,
            total,
          }),
        });
        if (orderRes.ok) {
          const data = (await orderRes.json()) as { orderId?: string };
          orderId = data.orderId;
        }
      }

      const orderNumber = orderId
        ? `#${String(orderId).slice(-4)}`
        : `#${Date.now().toString().slice(-4)}`;

      savePlacedOrder({
        orderId,
        orderNumber,
        placedOn: new Date().toLocaleDateString("ro-RO"),
        fulfillment:
          fulfillment === "pickup" ? "Ridicare din locație" : "Livrare la adresă",
        deliveryEstimate: isPartialSplit
          ? "Livrare în două etape"
          : hasMixedTypes
            ? "1–2 zile lucrătoare"
            : "Azi sau 1–2 zile",
        customer: {
          name: customerName,
          phone: phone.trim(),
          email: email.trim() || "—",
          address:
            fulfillment === "delivery" ? address.trim() : PICKUP_ADDRESS,
          details: addressDetails.trim() || "—",
          orderNotes: orderNotes.trim() || "—",
          paymentMethod: paymentLabel,
        },
        isPartialSplit: Boolean(isPartialSplit),
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        subtotal,
        deliveryFeeTotal,
      });

      clearCart();

      if (payment === "card") {
        const stripeRes = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            total,
            customerEmail: email.trim() || undefined,
            orderId,
            orderNumber,
          }),
        });
        const stripeData = (await stripeRes.json()) as {
          url?: string;
          mock?: boolean;
          error?: string;
        };
        if (stripeData.url) {
          router.push(stripeData.url);
          return;
        }
      }

      router.push("/checkout/confirmare");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative h-[265px] overflow-hidden">
        <Image
          src="/images/home/hero.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/60" />
      </section>

      <section className="bg-white px-6 py-12 lg:px-12">
        <div className="mx-auto max-w-[1248px]">
          {isPartialSplit && (
            <div className="mb-8 rounded-2xl border border-brand-gold/40 bg-brand-lilac/30 px-6 py-4">
              <p className="font-serif text-lg font-semibold text-brand-navy">
                Produsele au fost împărțite în două comenzi
              </p>
              <p className="mt-1 text-sm text-text-muted">
                Livrăm produsele disponibile chiar acum. Iar restul în
                aproximativ 1–2 zile.
              </p>
            </div>
          )}

          <h1 className="font-serif text-4xl font-semibold text-brand-navy">
            Încă puțin și comanda ta este pregătită
          </h1>
          <p className="mt-2 text-lg text-text-muted">
            Introdu datele de livrare pentru a continua.
          </p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[713px_1fr]">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-navy">
                  Date de contact
                </h2>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  <div>
                    <FieldLabel>Prenume *</FieldLabel>
                    <TextInput
                      placeholder="ex : Andrei"
                      value={firstName}
                      onChange={setFirstName}
                    />
                  </div>
                  <div>
                    <FieldLabel>Nume *</FieldLabel>
                    <TextInput
                      placeholder="ex : Popescu"
                      value={lastName}
                      onChange={setLastName}
                    />
                  </div>
                  <div>
                    <FieldLabel>Telefon *</FieldLabel>
                    <div className="flex h-9 items-center rounded-lg border border-border-card bg-white px-2">
                      <span className="text-sm text-text-muted">🇷🇴 +40</span>
                      <span className="mx-2 h-6 w-px bg-border-card" />
                      <input
                        type="tel"
                        className="flex-1 bg-transparent text-base outline-none"
                        placeholder="+ 40 123456789"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Email ( opțional )</FieldLabel>
                    <TextInput
                      placeholder="ex : exemplu@gmail.com"
                      value={email}
                      onChange={setEmail}
                    />
                  </div>
                </div>
              </div>

              <div className="h-0.5 bg-border-card" />

              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-navy">
                  Livrare
                </h2>
                <div className="mt-5 space-y-3">
                  <RadioOption
                    name="fulfillment"
                    value="delivery"
                    checked={fulfillment === "delivery"}
                    onChange={() => setFulfillment("delivery")}
                    label="Livrare la adresă"
                  />
                  <RadioOption
                    name="fulfillment"
                    value="pickup"
                    checked={fulfillment === "pickup"}
                    onChange={() => setFulfillment("pickup")}
                    label="Ridicare din locația noastră"
                  />
                </div>
              </div>

              {fulfillment === "delivery" ? (
                <>
                  <div className="h-0.5 bg-border-card" />
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-brand-navy">
                      Unde să livrăm ?
                    </h2>
                    <div className="mt-5 space-y-5">
                      <div>
                        <FieldLabel>Adresa completă *</FieldLabel>
                        <TextInput
                          placeholder="ex : Strada Florilor, nr. 23, ap. 4"
                          value={address}
                          onChange={setAddress}
                        />
                      </div>
                      <div>
                        <FieldLabel>
                          Detalii suplimentare ( opțional )
                        </FieldLabel>
                        <TextInput
                          placeholder="ex : Scara A, Etaj 2, Interfon 04"
                          value={addressDetails}
                          onChange={setAddressDetails}
                        />
                      </div>
                      <div>
                        <FieldLabel>Localitate *</FieldLabel>
                        <select
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="h-9 w-full rounded-lg border border-border-card bg-white px-3 text-base text-brand-navy outline-none focus:border-brand-gold"
                        >
                          <option value="">Alege localitatea</option>
                          <option value="Baia Mare">Baia Mare</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-0.5 bg-border-card" />
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-brand-navy">
                      Te vom aștepta să ridici comanda din locația noastră
                    </h2>
                    <a
                      href={PICKUP_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center gap-2 text-base text-brand-gold hover:underline"
                    >
                      <span aria-hidden>📍</span>
                      {PICKUP_ADDRESS}
                    </a>
                    <a
                      href={PICKUP_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 block h-[149px] overflow-hidden rounded-2xl border border-border-card"
                    >
                      <iframe
                        title="Locație Prestige Cakes"
                        src="https://maps.google.com/maps?q=Aleea+Dobrogei+1+Baia+Mare&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="pointer-events-none h-full w-full border-0"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </>
              )}

              <div className="h-0.5 bg-border-card" />

              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-navy">
                  Detalii comandă ( optional )
                </h2>
                <textarea
                  rows={4}
                  placeholder="Adaugă un mesaj personalizat pentru tort sau instrucțiuni speciale de livrare..."
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="mt-5 w-full rounded-lg border border-border-card bg-white p-3 text-base text-brand-navy outline-none focus:border-brand-gold"
                />
              </div>

              <div className="h-0.5 bg-border-card" />

              <div>
                <h2 className="font-serif text-xl font-semibold text-brand-navy">
                  Metoda de plată
                </h2>
                <div className="mt-5 space-y-3">
                  <RadioOption
                    name="payment"
                    value="card"
                    checked={payment === "card"}
                    onChange={() => setPayment("card")}
                    label="Card online"
                  />
                  <RadioOption
                    name="payment"
                    value="cash"
                    checked={payment === "cash"}
                    onChange={() => setPayment("cash")}
                    label={cashLabel}
                  />
                </div>
              </div>

              <div className="h-0.5 bg-border-card" />

              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="h-6 w-6 rounded border-border-card accent-brand-gold"
                />
                <span className="text-base text-brand-navy">
                  Sunt de acord cu{" "}
                  <Link href="#" className="text-brand-gold hover:underline">
                    termenii &amp; condițiile
                  </Link>{" "}
                  *
                </span>
              </label>

              <Button
                type="button"
                variant="primary"
                disabled={!canSubmit || submitting}
                onClick={handleSubmit}
                className={`w-full ${!canSubmit ? "opacity-50" : ""}`}
              >
                {submitting ? "Se procesează..." : ctaLabel}
              </Button>
            </form>

            <OrderSummary
              items={summaryItems}
              subtotal={subtotal}
              deliveryFee={DELIVERY_FEE}
              deliveryFeeCount={deliveryFeeCount}
              showDelivery={showDelivery}
              splitPackages={splitPackages}
            />
          </div>
        </div>
      </section>
    </>
  );
}

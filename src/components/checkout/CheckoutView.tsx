"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";

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
}: {
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
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
  const [fulfillment, setFulfillment] = useState<Fulfillment>(
    defaultFulfillment,
  );
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const cashLabel =
    fulfillment === "pickup"
      ? "Numerar la ridicarea comenzii"
      : "Numerar la livrare";

  const submitHref =
    fulfillment === "pickup" ? "/checkout/confirmare" : "/checkout/confirmare";

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
                    <TextInput />
                  </div>
                  <div>
                    <FieldLabel>Nume *</FieldLabel>
                    <TextInput />
                  </div>
                  <div>
                    <FieldLabel>Telefon *</FieldLabel>
                    <div className="flex h-9 items-center rounded-lg border border-border-card bg-white px-2">
                      <span className="text-sm text-text-muted">🇷🇴 +40</span>
                      <span className="mx-2 h-6 w-px bg-border-card" />
                      <input
                        type="tel"
                        className="flex-1 bg-transparent text-base outline-none"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Email ( opțional )</FieldLabel>
                    <TextInput />
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
                        <TextInput />
                      </div>
                      <div>
                        <FieldLabel>Detalii suplimentare ( opțional )</FieldLabel>
                        <TextInput />
                      </div>
                      <div>
                        <FieldLabel>Localitate *</FieldLabel>
                        <select className="h-9 w-full rounded-lg border border-border-card bg-white px-3 text-base text-text-muted outline-none focus:border-brand-gold">
                          <option>Alege localitatea</option>
                          <option>Baia Mare</option>
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
                    <p className="mt-4 flex items-center gap-2 text-base text-brand-navy">
                      <span aria-hidden>📍</span>
                      Baia Mare, Aleea Dobrogei nr. 1
                    </p>
                    <div className="mt-5 h-[149px] overflow-hidden rounded-2xl border border-border-card bg-brand-lilac/40">
                      <iframe
                        title="Locație Prestige Cakes"
                        src="https://maps.google.com/maps?q=Aleea+Dobrogei+1+Baia+Mare&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        className="h-full w-full border-0"
                        loading="lazy"
                      />
                    </div>
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
                href={termsAccepted ? submitHref : undefined}
                variant="primary"
                className={`w-full ${!termsAccepted ? "pointer-events-none opacity-50" : ""}`}
              >
                Continuă la plată
              </Button>
            </form>

            <OrderSummary showDelivery={fulfillment === "delivery"} />
          </div>
        </div>
      </section>
    </>
  );
}

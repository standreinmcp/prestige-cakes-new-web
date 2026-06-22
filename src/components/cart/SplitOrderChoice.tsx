"use client";

import type { SplitStrategy } from "@/lib/cart-types";

type SplitOrderChoiceProps = {
  value: SplitStrategy;
  onChange: (strategy: SplitStrategy) => void;
};

export function SplitOrderChoice({ value, onChange }: SplitOrderChoiceProps) {
  return (
    <section className="rounded-[22px] border border-brand-gold/40 bg-brand-lilac/40 p-6 lg:p-8">
      <h2 className="font-serif text-2xl font-semibold text-brand-navy">
        Livrare mai rapidă?
      </h2>
      <p className="mt-2 text-base text-text-muted">
        Unele produse din coș sunt gata de livrare acum, iar altele în
        aproximativ 1–2 zile.
      </p>
      <p className="mt-4 font-medium text-brand-navy">Cum livrăm?</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onChange("partial")}
          className={`rounded-2xl border p-5 text-left transition-colors ${
            value === "partial"
              ? "border-brand-gold bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              : "border-border-card bg-white/80 hover:border-brand-gold/60"
          }`}
        >
          <div className="flex items-center gap-2 font-semibold text-brand-navy">
            <span aria-hidden>⚡</span>
            Livrare rapidă
          </div>
          <p className="mt-2 text-sm text-text-muted">
            Livrăm produsele disponibile chiar acum. Iar restul în aproximativ
            1–2 zile.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onChange("unified")}
          className={`rounded-2xl border p-5 text-left transition-colors ${
            value === "unified"
              ? "border-brand-gold bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
              : "border-border-card bg-white/80 hover:border-brand-gold/60"
          }`}
        >
          <div className="flex items-center gap-2 font-semibold text-brand-navy">
            <span aria-hidden>📦</span>
            O singură livrare
          </div>
          <p className="mt-2 text-sm text-text-muted">
            O singură livrare, când toate produsele sunt pregătite în 1–2 zile.
          </p>
        </button>
      </div>
    </section>
  );
}

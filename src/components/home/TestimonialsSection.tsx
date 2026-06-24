"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  cardGoldAccent,
  cardShadowGutter,
  interactiveCardShell,
} from "@/lib/card-surface";

const testimonials = [
  {
    quote:
      "Am comandat deserturi pentru evenimentul nostru anual și au fost absolut delicioase. Prezentarea a fost impecabilă, iar gustul exceptional. Recomand cu încredere!",
    name: "Maria Popescu",
    role: "Client corporativ",
    initial: "M",
  },
  {
    quote:
      "Tortul de nuntă realizat de ei a fost exact cum ne-am imaginat. Atenția la detalii și profesionalismul echipei sunt de admirat. Mulțumim!",
    name: "Alexandru Ionescu",
    role: "Client privat",
    initial: "A",
  },
  {
    quote:
      "Colaborez cu ei de mai mulți ani pentru evenimente premium. Întotdeauna livrează calitate constantă și respectă termenele. Foarte profesioniști!",
    name: "Elena Dumitrescu",
    role: "Organizator evenimente",
    initial: "E",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-brand-gold" aria-label="5 stele">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({
  item,
}: {
  item: (typeof testimonials)[number];
}) {
  return (
    <article
      className={`group relative flex min-h-[262px] w-full flex-col p-[26px] ${interactiveCardShell()}`}
    >
      <span
        className="pointer-events-none absolute right-4 top-[-10px] font-serif text-7xl text-brand-gold/15"
        aria-hidden
      >
        &ldquo;
      </span>
      <Stars />
      <p className="mt-4 text-base leading-relaxed text-text-muted">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-brand-navy font-semibold text-[22px] text-brand-gold">
          {item.initial}
        </span>
        <div>
          <p className="font-serif text-lg font-semibold text-brand-navy">
            {item.name}
          </p>
          <p className="text-sm text-text-muted">{item.role}</p>
        </div>
      </div>
      <div className={cardGoldAccent()} aria-hidden />
    </article>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-gradient-to-b from-[#fcfcff] to-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeader badge="Testimoniale" title="Ce spun clienții noștri" />

        <div className="mt-16 flex flex-col items-center gap-2 py-2 lg:grid lg:grid-cols-3 lg:gap-[34px] lg:py-2">
          {testimonials.map((item) => (
            <div key={item.name} className={`w-full max-w-[326px] lg:max-w-none ${cardShadowGutter()}`}>
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

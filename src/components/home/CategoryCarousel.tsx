"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, CaretCircleIcon } from "@/components/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cardGoldAccent, interactiveCardShell } from "@/lib/card-surface";

const categories = [
  {
    slug: "croissante",
    name: "Croissante",
    description:
      "Croissante fragede cu fistic, coapte zilnic, realizate cu ingrediente premium și atenție la detalii fin!",
    imagePosition: "0% 0%",
  },
  {
    slug: "cozonaci",
    name: "Cozonaci",
    description:
      "Cozonaci artizanali pentru momente speciale, preparați cu ingrediente premium și atenție la detalii!",
    imagePosition: "33% 0%",
    featured: true,
  },
  {
    slug: "choux",
    name: "Choux",
    description:
      "Choux elegante cu creme fine, glazurate delica, create cu ingrediente premium și atenție la detalii!",
    imagePosition: "66% 0%",
  },
  {
    slug: "tarte",
    name: "Tarte",
    description:
      "Tarte rafinate cu fructe, coapte zilnic, realizate cu ingrediente premium și atenție la detalii fin!",
    imagePosition: "100% 0%",
  },
];

export function CategoryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((current) => (current === 0 ? categories.length - 1 : current - 1));
  const next = () =>
    setActiveIndex((current) => (current === categories.length - 1 ? 0 : current + 1));

  return (
    <section id="categorii" className="bg-gradient-to-b from-white to-[#fcfcff] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeader
          badge="Produsele noastre"
          title="Explorează gama noastră"
          subtitle="Fiecare produs poartă semnătura pasiunii pentru un gust autentic și calitate fără compromis."
        />

        <div className="relative mt-16">
          <button
            type="button"
            onClick={prev}
            className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rotate-180 lg:block"
            aria-label="Categorie anterioară"
          >
            <CaretCircleIcon />
          </button>

          <div className="grid gap-[34px] sm:grid-cols-2 xl:grid-cols-4">
            {categories.map((category, index) => {
              const isFeatured = category.featured || index === activeIndex;
              return (
                <article
                  key={category.slug}
                  className={`group flex flex-col ${interactiveCardShell(isFeatured)}`}
                >
                  <div className="relative h-60 overflow-hidden">
                    <Image
                      src="/images/home/categories.jpg"
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      style={{ objectPosition: category.imagePosition }}
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </div>
                  <div className="flex flex-col gap-2 px-3 py-5">
                    <h3 className="font-serif text-[22px] font-semibold text-brand-navy">
                      {category.name}
                    </h3>
                    <p className="text-base leading-relaxed text-text-muted">
                      {category.description}
                    </p>
                    <Link
                      href={`/vitrina-live?categorie=${category.slug}`}
                      className="inline-flex items-center gap-2 py-2.5 text-base font-medium text-brand-gold transition-transform duration-300 group-hover:gap-3"
                    >
                      Vezi tot
                      <ArrowRightIcon />
                    </Link>
                  </div>
                  <div className={cardGoldAccent(isFeatured)} aria-hidden />
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
            aria-label="Categorie următoare"
          >
            <CaretCircleIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon, CaretCircleIcon } from "@/components/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  cardGoldAccent,
  cardShadowGutter,
  interactiveCardShell,
} from "@/lib/card-surface";

const CARD_WIDTH = 240;
const CARD_GUTTER = 16;
const CARD_GAP = 34;

const categories = [
  {
    slug: "croissante",
    name: "Croissante",
    description:
      "Croissante fragede cu unt, coapte zilnic, realizate cu ingrediente premium și atenție la detalii fin!",
    image: "/images/home/categories/croissante.jpg",
  },
  {
    slug: "cozonaci",
    name: "Cozonaci",
    description:
      "Cozonaci artizanali pentru momente speciale, preparați cu ingrediente premium și atenție la detalii!",
    image: "/images/home/categories/cozonaci.jpg",
  },
  {
    slug: "choux",
    name: "Choux",
    description:
      "Choux elegante cu creme fine, glazurate delica, create cu ingrediente premium și atenție la detalii!",
    image: "/images/home/categories/choux.jpg",
  },
  {
    slug: "tarte",
    name: "Tarte",
    description:
      "Tarte rafinate cu fructe, coapte zilnic, realizate cu ingrediente premium și atenție la detalii fin!",
    image: "/images/home/categories/tarte.jpg",
  },
];

export function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * (CARD_WIDTH + CARD_GUTTER + CARD_GAP),
      behavior: "smooth",
    });
  };

  return (
    <section id="categorii" className="bg-gradient-to-b from-white to-[#fcfcff] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeader
          badge="Produsele noastre"
          title="Explorează gama noastră"
          subtitle="Fiecare produs poartă semnătura pasiunii pentru un gust autentic și calitate fără compromis."
        />

        <div className="mt-16 lg:flex lg:items-center lg:gap-2">
          <button
            type="button"
            className="hidden shrink-0 rotate-180 disabled:opacity-30 lg:block"
            aria-label="Categorie anterioară"
            disabled={!canScrollPrev}
            onClick={() => scrollByCard(-1)}
          >
            <CaretCircleIcon />
          </button>

          <div className="relative min-w-0 flex-1 overflow-visible">
            <div
              ref={scrollRef}
              onScroll={updateScrollState}
              className="-mx-6 flex snap-x snap-mandatory gap-[34px] overflow-x-auto px-6 pt-3 pb-10 scrollbar-none lg:mx-0 lg:justify-center lg:px-2 lg:pb-12"
              style={{ scrollbarWidth: "none" }}
            >
            {categories.map((category) => (
              <div key={category.slug} className={`${cardShadowGutter()} shrink-0 snap-start`}>
              <article
                className={`group flex w-[240px] flex-col ${interactiveCardShell()}`}
              >
                <div className="relative h-60 overflow-hidden rounded-t-[22px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="240px"
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
                    className="inline-flex items-center gap-2 py-2.5 text-base font-medium text-brand-gold transition-all duration-300 group-hover:gap-3"
                  >
                    Vezi tot
                    <ArrowRightIcon />
                  </Link>
                </div>
                <div className={cardGoldAccent()} aria-hidden />
              </article>
              </div>
            ))}
            </div>
          </div>

          <button
            type="button"
            className="hidden shrink-0 disabled:opacity-30 lg:block"
            aria-label="Categorie următoare"
            disabled={!canScrollNext}
            onClick={() => scrollByCard(1)}
          >
            <CaretCircleIcon />
          </button>

          <div className="mt-6 flex items-center justify-center gap-8 lg:hidden">
            <button
              type="button"
              className="rotate-180 disabled:opacity-30"
              aria-label="Categorie anterioară"
              disabled={!canScrollPrev}
              onClick={() => scrollByCard(-1)}
            >
              <CaretCircleIcon />
            </button>
            <button
              type="button"
              className="disabled:opacity-30"
              aria-label="Categorie următoare"
              disabled={!canScrollNext}
              onClick={() => scrollByCard(1)}
            >
              <CaretCircleIcon />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

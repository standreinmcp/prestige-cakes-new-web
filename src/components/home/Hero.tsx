"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronRightIcon, WavyCheckIcon } from "@/components/icons";

const heroImages = [
  { src: "/images/home/hero.jpg", alt: "Deserturi artizanale Prestige Cakes" },
  { src: "/images/home/kitchen.jpg", alt: "Laboratorul Prestige Cakes" },
  { src: "/images/home/categories.jpg", alt: "Selecție de prăjituri" },
];

const stats = [
  { value: "100 %", label: "Ingrediente naturale" },
  { value: "Zilnic", label: "Producție proaspătă" },
  { value: "15+", label: "Ani experientă" },
];

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[945px] overflow-hidden">
      {heroImages.map((image, index) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-brand-navy/55" />

      <div className="relative mx-auto flex max-w-[741px] flex-col items-center px-6 pt-[234px] text-center lg:px-0">
        <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-brand-gold px-[22px] py-2 text-base text-brand-gold">
          Producem zilnic, cu pasiune
          <WavyCheckIcon className="h-6 w-6 text-brand-gold" />
        </span>

        <h1 className="font-serif text-5xl font-semibold leading-tight text-white lg:text-[64px]">
          Deserturi premium{" "}
          <span className="text-brand-gold">
            pentru momente
            <br />
            speciale
          </span>
        </h1>

        <p className="mt-8 text-[22px] font-medium text-neutral-soft">
          Produse zilnic, din ingrediente naturale, la standarde profesionale
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <Button href="/vitrina-live" variant="primary" className="min-w-[204px]">
            Vezi vitrina live
            <ChevronRightIcon />
          </Button>
          <Button
            href="/produse-la-comanda"
            variant="secondary"
            className="min-w-[204px]"
          >
            Produse la comandă
          </Button>
        </div>
      </div>

      <a
        href="#categorii"
        className="absolute bottom-36 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center text-white/90 hover:text-brand-gold"
        aria-label="Derulează la categorii"
      >
        <span className="text-sm font-medium">Descoperă</span>
        <span className="text-2xl" aria-hidden>
          ↓
        </span>
      </a>

      <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-brand-navy/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[883px] items-center justify-center px-6 py-10">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              {index > 0 ? (
                <div className="mx-[50px] hidden h-20 w-px bg-[#686868] sm:block" aria-hidden />
              ) : null}
              <div className="flex flex-col items-center gap-2.5 px-2.5 py-2.5 text-center">
                <p className="font-serif text-[32px] font-medium uppercase text-brand-gold">
                  {stat.value}
                </p>
                <p className="text-base font-medium text-neutral-soft">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

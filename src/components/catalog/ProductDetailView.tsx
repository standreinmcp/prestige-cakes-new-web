"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/Button";
import { CartIcon } from "@/components/icons";
import type { ProductDetailData } from "@/lib/product-data";
import type { ProductCardData } from "@/components/catalog/ProductCard";

const trustBadges = [
  { icon: "🏅", label: "Artizanal" },
  { icon: "🌿", label: "Fără conservanți" },
  { icon: "🕐", label: "Preparat zilnic" },
  { icon: "⭐", label: "Ingrediente premium" },
];

type ProductDetailViewProps = {
  product: ProductDetailData;
  similar: ProductCardData[];
};

export function ProductDetailView({ product, similar }: ProductDetailViewProps) {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = ((product.pricePerKg * 0.07) * quantity).toFixed(2);

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

      <section className="bg-white px-6 pb-12 pt-8 lg:px-12 lg:pt-12">
        <div className="mx-auto grid max-w-[1189px] gap-12 lg:grid-cols-[506px_1fr]">
          <div className="relative aspect-square overflow-hidden rounded-[40px] shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/home/categories.jpg"
              alt={product.name}
              fill
              className="object-cover"
              style={{ objectPosition: product.imagePosition ?? "center" }}
              priority
              sizes="506px"
            />
          </div>

          <div>
            <h1 className="font-serif text-4xl font-semibold text-brand-navy">
              {product.name}
            </h1>
            <p className="mt-4 font-serif text-2xl text-brand-navy/80">
              {product.portion}
            </p>
            <p className="mt-6 max-w-[612px] text-base leading-relaxed text-text-muted">
              {product.longDescription}
            </p>

            <div className="my-6 h-0.5 w-full max-w-[612px] bg-border-card" />

            <p className="text-base font-medium text-brand-navy">
              Valori nutriționale ( per 100 g )
            </p>
            <div className="mt-4 grid max-w-[610px] grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { value: product.nutrition.calories, unit: "kcal", label: "Calorii" },
                { value: product.nutrition.protein, unit: "g", label: "Proteine" },
                { value: product.nutrition.carbs, unit: "g", label: "Carbohidrați" },
                { value: product.nutrition.fat, unit: "g", label: "Grăsimi" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex h-[100px] flex-col items-center justify-center rounded-2xl bg-brand-lilac/50 text-center"
                >
                  <span className="font-serif text-3xl font-semibold text-brand-navy">
                    {item.value}
                  </span>
                  <span className="text-sm text-text-muted">{item.unit}</span>
                  <span className="text-sm text-text-muted">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1115px] flex-wrap justify-between gap-8 border-t border-border-card pt-10">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex flex-col items-center gap-3">
              <span className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-icon-cream text-2xl">
                {badge.icon}
              </span>
              <span className="text-base font-medium text-brand-navy">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-[1189px] flex-wrap items-end justify-between gap-6">
          <div>
            <p className="flex items-baseline gap-3 text-brand-navy">
              <span className="text-lg">Preț :</span>
              <span className="font-serif text-2xl font-semibold">
                {product.priceLabel}
              </span>
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex h-14 items-center overflow-hidden rounded-full border border-border-card">
                <button
                  type="button"
                  className="flex h-full w-14 items-center justify-center text-brand-navy hover:bg-brand-lilac"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Scade cantitatea"
                >
                  −
                </button>
                <span className="w-10 text-center text-lg font-medium">{quantity}</span>
                <button
                  type="button"
                  className="flex h-full w-14 items-center justify-center text-brand-navy hover:bg-brand-lilac"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Crește cantitatea"
                >
                  +
                </button>
              </div>
              <Button variant="primary" className="gap-3">
                <CartIcon className="h-6 w-6" />
                Adaugă {quantity} pentru {unitPrice} lei
              </Button>
            </div>
          </div>
          <Link
            href="/vitrina-live"
            className="inline-flex h-14 items-center rounded-full border border-brand-navy px-8 text-base font-medium text-brand-navy hover:bg-brand-lilac"
          >
            Înapoi la produse
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-[#fcfcff] px-6 py-16 lg:px-12">
        <h2 className="text-center font-serif text-4xl font-semibold text-brand-navy">
          Produse asemănătoare
        </h2>
        <div className="mx-auto mt-12 grid max-w-[1062px] justify-items-center gap-x-[34px] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>
    </>
  );
}

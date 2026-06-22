"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CategoryFilter,
  type CatalogFilterId,
} from "@/components/catalog/CategoryFilter";
import { ProductCard, type ProductCardData } from "@/components/catalog/ProductCard";

type CatalogPageProps = {
  title: string;
  subtitle: string;
  products: ProductCardData[];
  showQuickAdd?: boolean;
};

export function CatalogPage({ title, subtitle, products, showQuickAdd }: CatalogPageProps) {
  const [filter, setFilter] = useState<CatalogFilterId>("popular");

  const filtered =
    filter === "all"
      ? products
      : filter === "popular"
        ? products.slice(0, 4)
        : products.filter((product) => {
            const name = product.name.toLowerCase();
            if (filter === "torturi") return name.includes("tort");
            if (filter === "prajituri") return true;
            if (filter === "cozonaci") return name.includes("cozonac");
            if (filter === "choux") return name.includes("choux");
            if (filter === "tarte") return name.includes("tarte");
            if (filter === "ciocolata")
              return name.includes("cicolată") || name.includes("ciocolată");
            return true;
          });

  return (
    <>
      <section className="relative h-[313px] overflow-hidden">
        <Image
          src="/images/home/hero.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/60" />
        <div className="relative mx-auto flex h-full max-w-[984px] flex-col justify-end px-6 pb-10 pt-24 lg:px-0">
          <h1 className="font-serif text-4xl font-semibold text-white lg:text-[36px]">
            {title}
          </h1>
          <p className="mt-3 text-lg font-medium text-neutral-soft">{subtitle}</p>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#fcfcff] to-white px-6 py-8 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <CategoryFilter active={filter} onChange={setFilter} />
        </div>
      </section>

      <section className="bg-white px-6 pb-20 lg:px-12">
        <div className="mx-auto grid max-w-[1062px] justify-items-center gap-x-[34px] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              showQuickAdd={showQuickAdd}
            />
          ))}
        </div>
      </section>
    </>
  );
}

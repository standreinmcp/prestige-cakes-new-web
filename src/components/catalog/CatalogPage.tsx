"use client";

import { useState } from "react";
import {
  CategoryFilter,
  type CatalogFilterId,
} from "@/components/catalog/CategoryFilter";
import { ProductCard, type ProductCardData } from "@/components/catalog/ProductCard";

type CatalogPageProps = {
  products: ProductCardData[];
  showQuickAdd?: boolean;
};

export function CatalogPage({ products, showQuickAdd }: CatalogPageProps) {
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
      <section className="relative z-10 -mt-2 bg-gradient-to-b from-[#fcfcff] to-white px-6 py-6 lg:mt-0 lg:px-12 lg:py-8">
        <div className="mx-auto max-w-[1440px]">
          <CategoryFilter active={filter} onChange={setFilter} />
        </div>
      </section>

      <section className="bg-white px-6 pb-20 pt-4 lg:px-12">
        <div className="mx-auto flex max-w-[1062px] flex-col items-center gap-8 lg:grid lg:grid-cols-4 lg:justify-items-center lg:gap-x-[34px] lg:gap-y-10">
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

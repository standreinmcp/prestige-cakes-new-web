"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, CartIcon } from "@/components/icons";
import { useCart } from "@/components/cart/CartProvider";
import { cardGoldAccent } from "@/lib/card-surface";
import { unitPriceFromKg } from "@/lib/cart-types";

import type { ProductType } from "@/lib/cart-types";

export type ProductCardData = {
  slug: string;
  name: string;
  description: string;
  portion: string;
  priceLabel: string;
  imagePosition?: string;
  imageUrl?: string;
  productType?: ProductType;
  stockQuantity?: number;
  unitPrice?: number;
  convexId?: string;
};

type ProductCardProps = {
  product: ProductCardData;
  showQuickAdd?: boolean;
};

export function ProductCard({ product, showQuickAdd }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const imageSrc = product.imageUrl ?? "/images/home/categories.jpg";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const price =
      product.unitPrice ??
      unitPriceFromKg(
        parseFloat(product.priceLabel) || 10,
        product.portion,
      );
    addItem({
      slug: product.slug,
      name: product.name,
      portion: product.portion,
      price,
      quantity: 1,
      imagePosition: product.imagePosition,
      productType: product.productType ?? "live",
      convexId: product.convexId,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="group relative w-full max-w-[335px] lg:max-w-[240px]">
      <Link
        href={`/produse/${product.slug}`}
        className={[
          "flex h-[150px] overflow-hidden rounded-[12px] border border-border-card bg-white shadow-[0_8px_10px_rgba(0,0,0,0.12)] transition-all duration-300",
          "lg:h-auto lg:flex-col lg:rounded-[22px] lg:group-hover:-translate-y-1 lg:group-hover:border-brand-gold lg:group-hover:shadow-[0_20px_16px_rgba(0,0,0,0.22)]",
        ].join(" ")}
      >
        <div className="relative h-full w-[124px] shrink-0 overflow-hidden lg:h-60 lg:w-full">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 lg:group-hover:scale-110"
            style={{ objectPosition: product.imagePosition ?? "center" }}
            sizes="(max-width: 1024px) 124px, 240px"
          />
          <div className="absolute inset-x-0 bottom-0 hidden translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-brand-gold/90 to-brand-gold/70 py-2 text-sm font-medium text-brand-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
            Vezi detalii
            <ArrowRightIcon />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-2.5 lg:px-2.5 lg:py-5">
          <h3 className="line-clamp-1 font-serif text-lg font-semibold text-brand-navy lg:text-[22px]">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-text-muted lg:mt-2 lg:line-clamp-none lg:text-base">
            {product.description}
          </p>
          <p className="mt-1 text-sm text-text-muted lg:mt-2 lg:text-base">
            {product.portion}
          </p>

          <div className="mt-auto flex items-center justify-between gap-2 pt-1 lg:hidden">
            <p className="font-serif text-lg font-semibold text-brand-navy">
              {product.priceLabel}
            </p>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-brand-gold">
              Vezi detalii
              <ArrowRightIcon />
            </span>
          </div>

          <p className="mt-2 hidden font-serif text-[22px] font-semibold text-brand-navy lg:block">
            {product.priceLabel}
          </p>
          {showQuickAdd && (
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`mt-4 hidden w-full items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-sm font-medium transition-colors lg:flex ${
                added
                  ? "border-green-500 bg-green-50 text-green-800"
                  : "border-brand-gold text-brand-navy hover:bg-brand-gold/10"
              }`}
            >
              <CartIcon className="h-4 w-4" />
              {added ? "Produs adăugat în coș" : "Adaugă în coș"}
            </button>
          )}
        </div>

        <div className={`hidden lg:block ${cardGoldAccent()}`} aria-hidden />
      </Link>
    </article>
  );
}

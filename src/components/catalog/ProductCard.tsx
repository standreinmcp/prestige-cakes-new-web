"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, CartIcon } from "@/components/icons";
import { useCart } from "@/components/cart/CartProvider";
import { cardGoldAccent, interactiveCardShell } from "@/lib/card-surface";
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
  featured?: boolean;
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
  const featured = Boolean(product.featured);

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
    <article className="group relative w-full max-w-[240px]">
      <Link
        href={`/produse/${product.slug}`}
        className={`flex flex-col ${interactiveCardShell(featured)}`}
      >
        <div className="relative h-60 overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            style={{ objectPosition: product.imagePosition ?? "center" }}
            sizes="240px"
          />
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-brand-gold/90 to-brand-gold/70 py-2 text-sm font-medium text-brand-navy opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Vezi detalii
            <ArrowRightIcon />
          </div>
        </div>

        <div className="px-2.5 py-5">
          <h3 className="font-serif text-[22px] font-semibold text-brand-navy">
            {product.name}
          </h3>
          <p className="mt-2 text-base font-medium leading-snug text-text-muted">
            {product.description}
          </p>
          <p className="mt-2 text-base text-text-muted">{product.portion}</p>
          <p className="mt-2 font-serif text-[22px] font-semibold text-brand-navy">
            {product.priceLabel}
          </p>
          {showQuickAdd && (
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-sm font-medium transition-colors ${
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

        <div className={cardGoldAccent(featured)} aria-hidden />
      </Link>
    </article>
  );
}

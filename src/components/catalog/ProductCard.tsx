"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export type ProductCardData = {
  slug: string;
  name: string;
  description: string;
  portion: string;
  priceLabel: string;
  imagePosition?: string;
  featured?: boolean;
};

type ProductCardProps = {
  product: ProductCardData;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative w-full max-w-[240px]">
      <Link href={`/produse/${product.slug}`} className="block">
        <div
          className={`overflow-hidden rounded-t-[22px] border border-transparent transition-all group-hover:border-brand-gold group-hover:border-b-0 ${
            product.featured ? "border-brand-gold border-b-0" : ""
          }`}
        >
          <div className="relative h-60 overflow-hidden">
            <Image
              src="/images/home/categories.jpg"
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              style={{ objectPosition: product.imagePosition ?? "center" }}
              sizes="240px"
            />
            <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-gradient-to-t from-brand-gold/90 to-brand-gold/70 py-2 text-sm font-medium text-brand-navy opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
              Vezi detalii
              <ArrowRightIcon />
            </div>
          </div>
        </div>

        <div
          className={`rounded-b-[22px] bg-white px-2.5 py-5 transition-all ${
            product.featured
              ? "border border-brand-gold shadow-[0_20px_16px_rgba(0,0,0,0.22)]"
              : "shadow-[0_8px_10px_rgba(0,0,0,0.12)] group-hover:border group-hover:border-brand-gold group-hover:shadow-[0_20px_16px_rgba(0,0,0,0.22)]"
          }`}
        >
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
          {product.featured ? (
            <div className="mt-3 h-1 bg-gradient-to-r from-white via-brand-gold to-white" />
          ) : null}
        </div>
      </Link>
    </article>
  );
}

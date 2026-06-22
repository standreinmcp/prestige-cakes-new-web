"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { ProductDetailView } from "@/components/catalog/ProductDetailView";
import { getProductBySlug, similarProducts } from "@/lib/product-data";
import {
  convexProductToCard,
  convexProductToDetail,
  type ConvexProduct,
} from "@/lib/catalog-mapper";

type ProductDetailClientProps = {
  slug: string;
};

export function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const convexProduct = useQuery(api.products.getBySlug, { slug });
  const liveProducts = useQuery(api.products.listLive);

  const product = useMemo(() => {
    if (convexProduct === undefined) return undefined;
    if (convexProduct) {
      return convexProductToDetail(convexProduct as ConvexProduct);
    }
    return getProductBySlug(slug) ?? null;
  }, [convexProduct, slug]);

  const similar = useMemo(() => {
    if (liveProducts && liveProducts.length > 0) {
      return liveProducts
        .filter((p) => p.slug !== slug)
        .slice(0, 4)
        .map((p) => convexProductToCard(p as ConvexProduct));
    }
    return similarProducts;
  }, [liveProducts, slug]);

  if (product === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-white text-text-muted">
        Se încarcă produsul...
      </div>
    );
  }

  if (product === null) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center bg-white px-6 text-center">
        <p className="font-serif text-2xl text-brand-navy">Produs negăsit</p>
        <a href="/vitrina-live" className="mt-4 text-brand-gold hover:underline">
          Înapoi la vitrină
        </a>
      </div>
    );
  }

  return <ProductDetailView product={product} similar={similar} />;
}

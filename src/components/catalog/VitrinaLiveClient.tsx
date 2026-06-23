"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { vitrinaProducts } from "@/lib/catalog-data";
import { filterAvailableLiveProducts } from "@/lib/catalog-utils";
import {
  convexProductToCard,
  type ConvexProduct,
} from "@/lib/catalog-mapper";

export function VitrinaLiveClient() {
  const liveProducts = useQuery(api.products.listLive);

  const products = useMemo(() => {
    if (liveProducts === undefined) return undefined;
    if (liveProducts.length > 0) {
      return liveProducts.map((p) => convexProductToCard(p as ConvexProduct));
    }
    return filterAvailableLiveProducts(vitrinaProducts);
  }, [liveProducts]);

  if (products === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-white text-text-muted">
        Se încarcă produsele...
      </div>
    );
  }

  return <CatalogPage products={products} showQuickAdd />;
}

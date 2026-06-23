"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { CatalogPage } from "@/components/catalog/CatalogPage";
import { madeToOrderProducts } from "@/lib/catalog-data";
import {
  convexProductToCard,
  type ConvexProduct,
} from "@/lib/catalog-mapper";

export function ProduseLaComandaClient() {
  const mtoProducts = useQuery(api.products.listMadeToOrder);

  const products = useMemo(() => {
    if (mtoProducts === undefined) return undefined;
    if (mtoProducts.length > 0) {
      return mtoProducts.map((p) => convexProductToCard(p as ConvexProduct));
    }
    return madeToOrderProducts;
  }, [mtoProducts]);

  if (products === undefined) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-white text-text-muted">
        Se încarcă produsele...
      </div>
    );
  }

  return <CatalogPage products={products} showQuickAdd />;
}

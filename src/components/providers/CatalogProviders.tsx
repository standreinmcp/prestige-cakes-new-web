"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/components/cart/CartProvider";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export function CatalogProviders({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider>
      <CartProvider>{children}</CartProvider>
    </ConvexClientProvider>
  );
}

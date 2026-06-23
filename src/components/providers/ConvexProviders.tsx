"use client";

import { ReactNode } from "react";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

export function ConvexProviders({ children }: { children: ReactNode }) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}

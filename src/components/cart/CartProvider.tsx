"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  type CartItem,
  type SplitStrategy,
  cartHasMixedTypes,
  partitionCartItems,
} from "@/lib/cart-types";

const STORAGE_KEY = "prestige-cart-v1";

type CartContextValue = {
  items: CartItem[];
  splitStrategy: SplitStrategy | null;
  hasMixedTypes: boolean;
  liveItems: CartItem[];
  madeToOrderItems: CartItem[];
  setSplitStrategy: (strategy: SplitStrategy) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  addItem: (item: Omit<CartItem, "id">) => void;
  clearCart: () => void;
  canCheckout: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

/** Demo cart mixing live + made-to-order (Figma split-order scenario). */
export const demoCartItems: CartItem[] = [
  {
    id: "live-1",
    slug: "tarte-cu-fructe",
    name: "Tarte cu fructe",
    portion: "70 g / o bucată.",
    price: 9.8,
    quantity: 1,
    imagePosition: "100% 0%",
    productType: "live",
  },
  {
    id: "mto-1",
    slug: "cozonac-cu-ciocolata",
    name: "Cozonac cu cicolată",
    portion: "500 g / o bucată.",
    price: 37.5,
    quantity: 1,
    imagePosition: "33% 0%",
    productType: "made_to_order",
  },
  {
    id: "live-2",
    slug: "choux-cu-vanilie",
    name: "Choux cu vanilie",
    portion: "250 g.",
    price: 27.5,
    quantity: 2,
    imagePosition: "66% 0%",
    productType: "live",
  },
  {
    id: "live-3",
    slug: "croissant-cu-fistic",
    name: "Croissant cu fistic",
    portion: "70 g / o bucată.",
    price: 5.95,
    quantity: 1,
    imagePosition: "0% 0%",
    productType: "live",
  },
];

function loadStoredCart(): { items: CartItem[]; splitStrategy: SplitStrategy | null } {
  if (typeof window === "undefined") {
    return { items: [], splitStrategy: null };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], splitStrategy: null };
    return JSON.parse(raw) as {
      items: CartItem[];
      splitStrategy: SplitStrategy | null;
    };
  } catch {
    return { items: [], splitStrategy: null };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [splitStrategy, setSplitStrategyState] = useState<SplitStrategy | null>(
    null,
  );
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadStoredCart();
    setItems(stored.items);
    setSplitStrategyState(stored.splitStrategy);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ items, splitStrategy }),
    );
  }, [items, splitStrategy, hydrated]);

  const hasMixedTypes = useMemo(() => cartHasMixedTypes(items), [items]);
  const { live: liveItems, madeToOrder: madeToOrderItems } = useMemo(
    () => partitionCartItems(items),
    [items],
  );

  useEffect(() => {
    if (!hasMixedTypes) {
      setSplitStrategyState(null);
    } else if (splitStrategy === null) {
      setSplitStrategyState("partial");
    }
  }, [hasMixedTypes, splitStrategy]);

  const setSplitStrategy = useCallback((strategy: SplitStrategy) => {
    setSplitStrategyState(strategy);
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const addItem = useCallback((item: Omit<CartItem, "id">) => {
    setItems((current) => {
      const existing = current.find((i) => i.slug === item.slug);
      if (existing) {
        return current.map((i) =>
          i.slug === item.slug
            ? { ...i, quantity: i.quantity + item.quantity }
            : i,
        );
      }
      return [
        ...current,
        { ...item, id: `${item.slug}-${Date.now()}` },
      ];
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setSplitStrategyState(null);
  }, []);

  const canCheckout =
    items.length > 0 && (!hasMixedTypes || splitStrategy !== null);

  const value: CartContextValue = {
    items,
    splitStrategy,
    hasMixedTypes,
    liveItems,
    madeToOrderItems,
    setSplitStrategy,
    updateQuantity,
    removeItem,
    addItem,
    clearCart,
    canCheckout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

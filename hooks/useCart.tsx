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
import { reconcileCartWithCatalog } from "@/lib/cart-sync";
import type { CartItem, Product } from "@/lib/types";
import { parseCartItems } from "@/lib/validate-product";

const STORAGE_KEY = "salvatore-cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  total: number;
  syncNotice: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  syncWithCatalog: (catalog: Product[]) => void;
  dismissSyncNotice: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return parseCartItems(JSON.parse(stored));
  } catch {
    return [];
  }
}

function saveCartToStorage(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function cartItemsEqual(a: CartItem[], b: CartItem[]): boolean {
  if (a.length !== b.length) return false;

  return a.every((item, index) => {
    const other = b[index];
    return (
      item.quantity === other.quantity &&
      item.product.id === other.product.id &&
      item.product.name === other.product.name &&
      item.product.description === other.product.description &&
      item.product.price === other.product.price &&
      item.product.category === other.product.category &&
      item.product.image === other.product.image &&
      item.product.unit === other.product.unit
    );
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [syncNotice, setSyncNotice] = useState(false);

  useEffect(() => {
    setItems(loadCartFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveCartToStorage(items);
    }
  }, [items, hydrated]);

  const syncWithCatalog = useCallback(
    (catalog: Product[]) => {
      if (!hydrated) {
        return;
      }

      setItems((current) => {
        const { items: synced, removedCount } =
          catalog.length === 0
            ? { items: [], removedCount: current.length }
            : reconcileCartWithCatalog(current, catalog);

        if (removedCount > 0) {
          setTimeout(() => setSyncNotice(true), 0);
        }

        return cartItemsEqual(current, synced) ? current : synced;
      });
    },
    [hydrated],
  );

  const dismissSyncNotice = useCallback(() => {
    setSyncNotice(false);
  }, []);

  const addItem = useCallback((product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { product, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.product.id !== productId));
      return;
    }
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      total,
      syncNotice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      syncWithCatalog,
      dismissSyncNotice,
    }),
    [
      items,
      itemCount,
      total,
      syncNotice,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      syncWithCatalog,
      dismissSyncNotice,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

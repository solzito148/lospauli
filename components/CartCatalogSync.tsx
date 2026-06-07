"use client";

import { useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/lib/types";

interface CartCatalogSyncProps {
  products: Product[];
}

export function CartCatalogSync({ products }: CartCatalogSyncProps) {
  const { syncWithCatalog } = useCart();

  useEffect(() => {
    syncWithCatalog(products);
  }, [products, syncWithCatalog]);

  return null;
}

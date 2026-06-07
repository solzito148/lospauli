import type { CartItem, Product } from "./types";

export function reconcileCartWithCatalog(
  items: CartItem[],
  catalog: Product[],
): { items: CartItem[]; removedCount: number } {
  const catalogById = new Map(catalog.map((product) => [product.id, product]));
  let removedCount = 0;

  const synced = items.flatMap((item) => {
    const current = catalogById.get(item.product.id);
    if (!current) {
      removedCount += 1;
      return [];
    }

    return [{ product: current, quantity: item.quantity }];
  });

  return { items: synced, removedCount };
}

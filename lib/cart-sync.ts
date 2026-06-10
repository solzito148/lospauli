import type { CartItem, Product } from "./types";

export function reconcileCartWithCatalog(
  items: CartItem[],
  catalog: Product[],
): { items: CartItem[]; removedCount: number } {
  const catalogById = new Map(catalog.map((product) => [product.id, product]));
  let removedCount = 0;

  const synced = items.flatMap<CartItem>((item) => {
    const current = catalogById.get(item.product.id);
    if (!current) {
      removedCount += 1;
      return [];
    }

    if (item.pack) {
      const pack = current.packOptions?.find(
        (option) => option.units === item.pack?.units,
      );
      if (!pack) {
        removedCount += 1;
        return [];
      }
      return [{ product: current, quantity: item.quantity, pack }];
    }

    return [{ product: current, quantity: item.quantity }];
  });

  return { items: synced, removedCount };
}

import type { CartItem, PackOption, Product, ProductCategory } from "./types";

function isProductCategory(value: unknown): value is ProductCategory {
  return value === "alfajores" || value === "conitos";
}

export function isValidPackOption(value: unknown): value is PackOption {
  if (!value || typeof value !== "object") {
    return false;
  }

  const pack = value as Record<string, unknown>;

  return (
    typeof pack.units === "number" &&
    Number.isInteger(pack.units) &&
    pack.units > 0 &&
    typeof pack.price === "number" &&
    Number.isFinite(pack.price) &&
    pack.price >= 0
  );
}

export function isValidProduct(value: unknown): value is Product {
  if (!value || typeof value !== "object") {
    return false;
  }

  const product = value as Record<string, unknown>;

  const packOptionsValid =
    product.packOptions === undefined ||
    (Array.isArray(product.packOptions) &&
      product.packOptions.every(isValidPackOption));

  return (
    typeof product.id === "string" &&
    product.id.length > 0 &&
    typeof product.name === "string" &&
    typeof product.description === "string" &&
    typeof product.price === "number" &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    isProductCategory(product.category) &&
    typeof product.image === "string" &&
    typeof product.unit === "string" &&
    packOptionsValid
  );
}

export function parseProducts(data: unknown): Product[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(isValidProduct);
}

export function parseCartItems(data: unknown): CartItem[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter((item): item is CartItem => {
    if (!item || typeof item !== "object") {
      return false;
    }

    const cartItem = item as CartItem;
    return (
      typeof cartItem.quantity === "number" &&
      Number.isInteger(cartItem.quantity) &&
      cartItem.quantity > 0 &&
      isValidProduct(cartItem.product) &&
      (cartItem.pack === undefined || isValidPackOption(cartItem.pack))
    );
  });
}

import { fallbackProducts } from "./products-fallback";
import { getProductFromStore, getProductsFromStore } from "./github-store";
import type { Product, ProductCategory } from "./types";

export async function getProducts(): Promise<Product[]> {
  try {
    return await getProductsFromStore();
  } catch {
    return fallbackProducts;
  }
}

export async function getProductsByCategory(
  category: ProductCategory,
): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.category === category);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const product = await getProductFromStore(id);
    if (product) {
      return product;
    }
  } catch {
    // fall through
  }

  return fallbackProducts.find((p) => p.id === id);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

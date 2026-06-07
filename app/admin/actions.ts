"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  createSession,
  getSessionCookieOptions,
  isAdminAuthenticated,
  SESSION_COOKIE,
  verifyAdminCredentials,
} from "@/lib/auth";
import {
  getMutableProductsFromStore,
  saveProducts,
  uploadProductImage,
} from "@/lib/github-store";
import { slugify } from "@/lib/products";
import type { Product, ProductCategory } from "@/lib/types";

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

type ActionResult = { error: string } | void;

async function requireAdmin(): Promise<ActionResult> {
  if (!(await isAdminAuthenticated())) {
    return { error: "No autorizado." };
  }
}

function validateImage(file: File): { error: string } | null {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return { error: "Formato no permitido. Usá JPG, PNG o WebP." };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return { error: "La imagen supera el máximo de 2 MB." };
  }

  return null;
}

function getSafeRedirectPath(value: string): string {
  if (value.startsWith("/admin") && !value.startsWith("/admin/login")) {
    return value;
  }
  return "/admin";
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = getSafeRedirectPath(String(formData.get("redirectTo") ?? ""));

  if (!verifyAdminCredentials(username, password)) {
    return { error: "Usuario o clave incorrectos." };
  }

  const token = await createSession();
  if (!token) {
    return { error: "SESSION_SECRET no configurado (mínimo 32 caracteres)." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, getSessionCookieOptions());

  redirect(redirectTo);
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}

export async function createProductAction(formData: FormData) {
  try {
    const authError = await requireAdmin();
    if (authError) {
      return authError;
    }

    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const price = Number(formData.get("price"));
    const category = String(formData.get("category") ?? "") as ProductCategory;
    const unit = String(formData.get("unit") ?? "unidad").trim();
    const idInput = String(formData.get("id") ?? "").trim();
    const image = formData.get("image");

    if (!name || !description || !unit || Number.isNaN(price) || price < 0) {
      return { error: "Completá todos los campos obligatorios." };
    }

    if (category !== "alfajores" && category !== "conitos") {
      return { error: "Categoría inválida." };
    }

    const id = idInput || slugify(name);
    if (!id) {
      return { error: "No se pudo generar un identificador para el producto." };
    }

    if (!(image instanceof File) || image.size === 0) {
      return { error: "Subí una foto del producto." };
    }

    const imageError = validateImage(image);
    if (imageError) {
      return imageError;
    }

    const products = await getMutableProductsFromStore();
    if (products.some((product) => product.id === id)) {
      return { error: "Ya existe un producto con ese identificador." };
    }

    const imagePath = await uploadProductImage(image, id);

    const newProduct: Product = {
      id,
      name,
      description,
      price: Math.round(price),
      category,
      image: imagePath,
      unit,
    };

    await saveProducts([...products, newProduct]);

    revalidatePath("/");
    revalidatePath("/admin");
    redirect("/admin");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "No se pudo crear el producto.",
    };
  }
}

export async function updateProductAction(formData: FormData) {
  try {
    const authError = await requireAdmin();
    if (authError) {
      return authError;
    }

    const id = String(formData.get("id") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const price = Number(formData.get("price"));
    const category = String(formData.get("category") ?? "") as ProductCategory;
    const unit = String(formData.get("unit") ?? "unidad").trim();
    const image = formData.get("image");

    if (!id || !name || !description || !unit || Number.isNaN(price) || price < 0) {
      return { error: "Completá todos los campos obligatorios." };
    }

    if (category !== "alfajores" && category !== "conitos") {
      return { error: "Categoría inválida." };
    }

    const products = await getMutableProductsFromStore();
    const index = products.findIndex((product) => product.id === id);

    if (index === -1) {
      return { error: "Producto no encontrado." };
    }

    let imagePath = products[index].image;
    if (image instanceof File && image.size > 0) {
      const imageError = validateImage(image);
      if (imageError) {
        return imageError;
      }
      imagePath = await uploadProductImage(image, id);
    }

    products[index] = {
      id,
      name,
      description,
      price: Math.round(price),
      category,
      image: imagePath,
      unit,
    };

    await saveProducts(products);

    revalidatePath("/");
    revalidatePath("/admin");
    redirect("/admin");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "No se pudo actualizar el producto.",
    };
  }
}

export async function deleteProductAction(formData: FormData) {
  try {
    const authError = await requireAdmin();
    if (authError) {
      return authError;
    }

    const id = String(formData.get("id") ?? "").trim();
    if (!id) {
      return { error: "Producto inválido." };
    }

    const products = await getMutableProductsFromStore();
    const filtered = products.filter((product) => product.id !== id);

    if (filtered.length === products.length) {
      return { error: "Producto no encontrado." };
    }

    await saveProducts(filtered);

    revalidatePath("/");
    revalidatePath("/admin");
    redirect("/admin");
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "No se pudo eliminar el producto.",
    };
  }
}

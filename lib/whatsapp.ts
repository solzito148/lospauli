import type { CartItem, PackOption, Product } from "./types";
import { formatPrice } from "./format";

const DEFAULT_WHATSAPP_NUMBER = "5491166306974";

export function getWhatsAppNumber(): string {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;
}

export function buildWhatsAppUrl(message: string): string {
  const phone = getWhatsAppNumber();
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function buildProductInquiryMessage(product: Product, pack?: PackOption): string {
  const name = pack ? `${product.name} (x${pack.units})` : product.name;
  const price = pack?.price ?? product.price;
  return `Hola SALVATORE! Quiero consultar por: ${name} (${formatPrice(price)} / ${product.unit}). ¿Está disponible?`;
}

export function buildCartOrderMessage(items: CartItem[]): string {
  const lines = items.map((item) => {
    const name = item.pack
      ? `${item.product.name} (x${item.pack.units})`
      : item.product.name;
    const unitPrice = item.pack?.price ?? item.product.price;
    return `- ${name} x${item.quantity} — ${formatPrice(unitPrice * item.quantity)}`;
  });
  const total = items.reduce(
    (sum, item) => sum + (item.pack?.price ?? item.product.price) * item.quantity,
    0,
  );

  return [
    "Hola SALVATORE! Quiero hacer un pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
    "",
    "¿Podemos coordinar entrega y forma de pago?",
  ].join("\n");
}

export function buildGeneralWhatsAppUrl(): string {
  return buildWhatsAppUrl("Hola SALVATORE! Quiero hacer un pedido de alfajores y conitos.");
}

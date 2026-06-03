"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { buildCartOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function CartBar() {
  const { items, itemCount, total, updateQuantity, removeItem } = useCart();

  if (itemCount === 0) return null;

  const whatsappUrl = buildWhatsAppUrl(buildCartOrderMessage(items));

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-dulce/30 bg-blanco/95 shadow-[0_-4px_24px_rgba(61,35,20,0.08)] backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="mb-3 max-h-32 overflow-y-auto sm:hidden">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border-b border-dulce/20 py-2 text-sm last:border-0"
            >
              <span className="text-cacao">{item.product.name}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-dulce/50 text-cacao"
                  aria-label={`Quitar uno de ${item.product.name}`}
                >
                  −
                </button>
                <span className="w-4 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-dulce/50 text-cacao"
                  aria-label={`Agregar uno de ${item.product.name}`}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="ml-1 text-xs text-cacao/60 underline"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-crema text-lg">
              🛒
            </div>
            <div>
              <p className="text-sm font-medium text-chocolate">
                {itemCount} {itemCount === 1 ? "producto" : "productos"}
              </p>
              <p className="font-serif text-lg font-semibold text-chocolate">
                {formatPrice(total)}
              </p>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-whatsapp px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-6"
          >
            Enviar pedido por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

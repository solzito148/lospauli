"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { buildCartOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function CartBar() {
  const { items, itemCount, total, updateQuantity, removeItem, syncNotice, dismissSyncNotice } =
    useCart();
  const [expanded, setExpanded] = useState(false);

  if (itemCount === 0) return null;

  const whatsappUrl = buildWhatsAppUrl(buildCartOrderMessage(items));

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-dulce/30 bg-blanco/95 shadow-[0_-4px_24px_rgba(61,35,20,0.08)] backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        {syncNotice && (
          <div className="mb-3 flex items-start justify-between gap-3 rounded-xl border border-dulce/30 bg-crema/80 px-3 py-2 text-xs text-cacao">
            <p>Se actualizó tu pedido según el catálogo actual.</p>
            <button
              type="button"
              onClick={dismissSyncNotice}
              className="shrink-0 font-medium text-chocolate underline-offset-2 hover:underline"
            >
              Entendido
            </button>
          </div>
        )}

        {expanded && (
          <div className="mb-3 max-h-48 overflow-y-auto rounded-xl border border-dulce/20 bg-crema/50 p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-cacao">
              Tu pedido
            </p>
            <ul className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex flex-col gap-2 border-b border-dulce/20 pb-2 text-sm last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-chocolate">{item.product.name}</p>
                    <p className="text-xs text-cacao/70">
                      {formatPrice(item.product.price)} c/u ·{" "}
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-dulce/50 text-cacao transition-colors hover:bg-blanco"
                      aria-label={`Quitar uno de ${item.product.name}`}
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-dulce/50 text-cacao transition-colors hover:bg-blanco"
                      aria-label={`Agregar uno de ${item.product.name}`}
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="ml-1 text-xs text-cacao/70 underline transition-colors hover:text-chocolate"
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
            aria-expanded={expanded}
            aria-label={expanded ? "Ocultar detalle del pedido" : "Ver y editar pedido"}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crema text-lg">
              🛒
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-chocolate">
                {itemCount} {itemCount === 1 ? "producto" : "productos"}
                <span className="ml-2 text-cacao/70">
                  {expanded ? "▲" : "▼ Editar"}
                </span>
              </p>
              <p className="font-serif text-lg font-semibold text-chocolate">
                Total: {formatPrice(total)}
              </p>
            </div>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-whatsapp px-4 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:px-6"
          >
            Enviar pedido
          </a>
        </div>
      </div>
    </div>
  );
}

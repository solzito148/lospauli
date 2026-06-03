"use client";

import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { buildProductInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const whatsappUrl = buildWhatsAppUrl(buildProductInquiryMessage(product));

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-dulce/30 bg-blanco shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-crema">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="font-serif text-lg text-chocolate">{product.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-cacao/80">{product.description}</p>
          <p className="mt-2 text-xs text-cacao/60">{product.unit}</p>
        </div>

        <p className="font-serif text-xl font-semibold text-chocolate">
          {formatPrice(product.price)}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => addItem(product)}
            className="flex-1 rounded-full bg-chocolate px-4 py-2.5 text-sm font-medium text-blanco transition-opacity hover:opacity-90"
          >
            Agregar al pedido
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full border border-cacao/40 px-4 py-2.5 text-center text-sm font-medium text-cacao transition-colors hover:border-cacao hover:bg-crema"
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}

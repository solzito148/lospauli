"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { buildProductInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const isPhoto = !(product.image ?? "").endsWith(".svg");

  const packOptions = product.packOptions ?? [];
  const hasPacks = packOptions.length > 0;
  const [selectedUnits, setSelectedUnits] = useState<number | undefined>(
    packOptions[0]?.units,
  );
  const selectedPack = hasPacks
    ? packOptions.find((option) => option.units === selectedUnits) ?? packOptions[0]
    : undefined;

  const displayPrice = selectedPack?.price ?? product.price;
  const whatsappUrl = buildWhatsAppUrl(
    buildProductInquiryMessage(product, selectedPack),
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-dulce/30 bg-blanco shadow-sm transition-shadow hover:shadow-md">
      <div className={`relative overflow-hidden bg-white ${isPhoto ? "aspect-[4/3]" : "aspect-square"}`}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`transition-transform duration-300 group-hover:scale-105 ${
            isPhoto ? "object-contain p-3" : "object-cover"
          }`}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <h3 className="font-serif text-lg text-chocolate">{product.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-cacao/80">{product.description}</p>
          <p className="mt-2 text-xs text-cacao/60">{product.unit}</p>
        </div>

        {hasPacks && (
          <div>
            <label
              htmlFor={`pack-${product.id}`}
              className="mb-1 block text-xs font-medium text-cacao"
            >
              Presentación
            </label>
            <select
              id={`pack-${product.id}`}
              value={selectedPack?.units}
              onChange={(event) => setSelectedUnits(Number(event.target.value))}
              className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-3 py-2 text-base text-chocolate outline-none focus:border-cacao sm:text-sm"
            >
              {packOptions.map((option) => (
                <option key={option.units} value={option.units}>
                  x{option.units} — {formatPrice(option.price)}
                </option>
              ))}
            </select>
          </div>
        )}

        <p className="font-serif text-2xl font-semibold tracking-tight text-chocolate">
          {formatPrice(displayPrice)}
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => addItem(product, selectedPack)}
            className="flex-1 rounded-full bg-chocolate px-4 py-2.5 text-sm font-medium text-blanco transition-opacity hover:opacity-90"
          >
            Agregar al pedido
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-full border border-cacao/40 px-4 py-2.5 text-center text-sm font-medium text-cacao transition-colors hover:border-cacao hover:bg-crema"
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}

"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { Product, ProductCategory } from "@/lib/types";

const categories: { id: ProductCategory; label: string; sectionId: string }[] = [
  { id: "alfajores", label: "Alfajores", sectionId: "alfajores" },
  { id: "conitos", label: "Conitos", sectionId: "conitos" },
];

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("alfajores");
  const filteredProducts = products.filter((p) => p.category === activeCategory);

  return (
    <section id="productos" className="bg-blanco py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-chocolate sm:text-4xl">Nuestros productos</h2>
          <p className="mt-3 text-cacao/80">
            Elegí tus favoritos y armá tu pedido por WhatsApp
          </p>
        </div>

        <div className="mb-10 flex justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              id={cat.sectionId}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-chocolate text-blanco"
                  : "border border-dulce/50 text-cacao hover:bg-crema"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

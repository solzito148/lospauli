import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "alfajor-clasico",
    name: "Alfajor Clásico",
    description: "Dulce de leche artesanal entre dos galletas bañadas en chocolate.",
    price: 850,
    category: "alfajores",
    image: "/products/alfajor-clasico.svg",
    unit: "unidad",
  },
  {
    id: "alfajor-negro",
    name: "Alfajor Negro",
    description: "Chocolate semiamargo, dulce de leche y cobertura intensa.",
    price: 920,
    category: "alfajores",
    image: "/products/alfajor-negro.svg",
    unit: "unidad",
  },
  {
    id: "alfajor-maicena",
    name: "Alfajor de Maicena",
    description: "Galletas de maicena, dulce de leche y coco rallado.",
    price: 780,
    category: "alfajores",
    image: "/products/alfajor-maicena.svg",
    unit: "unidad",
  },
  {
    id: "alfajor-triple",
    name: "Alfajor Triple",
    description: "Triple capa de dulce de leche con baño de chocolate.",
    price: 1100,
    category: "alfajores",
    image: "/products/alfajor-triple.svg",
    unit: "unidad",
  },
  {
    id: "conito-clasico",
    name: "Conito Clásico",
    description: "Cono de oblea relleno de dulce de leche y baño de chocolate.",
    price: 650,
    category: "conitos",
    image: "/products/conito-clasico.svg",
    unit: "unidad",
  },
  {
    id: "conito-blanco",
    name: "Conito Blanco",
    description: "Relleno cremoso con cobertura de chocolate blanco.",
    price: 680,
    category: "conitos",
    image: "/products/conito-blanco.svg",
    unit: "unidad",
  },
  {
    id: "conito-semiamargo",
    name: "Conito Semiamargo",
    description: "Chocolate semiamargo con centro de dulce de leche.",
    price: 700,
    category: "conitos",
    image: "/products/conito-semiamargo.svg",
    unit: "unidad",
  },
  {
    id: "conito-mix-x6",
    name: "Caja Mix Conitos x6",
    description: "Selección surtida de conitos clásico, blanco y semiamargo.",
    price: 3800,
    category: "conitos",
    image: "/products/conito-mix.svg",
    unit: "caja x6",
  },
];

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

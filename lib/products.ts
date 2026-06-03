import type { Product } from "./types";

export const products: Product[] = [
  {
    id: "alfajor-clasico",
    name: "Alfajor Clásico",
    description: "Dulce de leche artesanal entre dos galletas bañadas en chocolate.",
    price: 850,
    category: "alfajores",
    image: "/products/alfajores-salvatore.png",
    unit: "unidad",
  },
  {
    id: "alfajor-negro",
    name: "Alfajor Negro",
    description: "Chocolate semiamargo, dulce de leche y cobertura intensa.",
    price: 920,
    category: "alfajores",
    image: "/products/alfajores-salvatore.png",
    unit: "unidad",
  },
  {
    id: "alfajor-maicena",
    name: "Alfajor de Maicena",
    description: "Galletas de maicena, dulce de leche y coco rallado.",
    price: 780,
    category: "alfajores",
    image: "/products/alfajores-salvatore.png",
    unit: "unidad",
  },
  {
    id: "alfajor-triple",
    name: "Alfajor Triple",
    description: "Triple capa de dulce de leche con baño de chocolate.",
    price: 1100,
    category: "alfajores",
    image: "/products/alfajores-salvatore.png",
    unit: "unidad",
  },
  {
    id: "conito-dulce-de-leche",
    name: "Conito Dulce de Leche",
    description: "Relleno con dulce de leche. Envoltorio dorado.",
    price: 650,
    category: "conitos",
    image: "/products/conito-dulce-de-leche.png",
    unit: "68 g",
  },
  {
    id: "conito-dulce-de-leche-nuez",
    name: "Conito Dulce de Leche y Nuez",
    description: "Relleno con dulce de leche y nuez. Envoltorio violeta.",
    price: 700,
    category: "conitos",
    image: "/products/conito-dulce-de-leche.png",
    unit: "75 g",
  },
  {
    id: "conito-dulce-de-leche-plateado",
    name: "Conito Dulce de Leche Plateado",
    description: "Relleno con dulce de leche. Envoltorio plateado.",
    price: 680,
    category: "conitos",
    image: "/products/conitos-salvatore.png",
    unit: "unidad",
  },
  {
    id: "conito-surtido",
    name: "Conitos Surtidos",
    description: "Selección de conitos SALVATORE: dulce de leche, nuez y plateado.",
    price: 3800,
    category: "conitos",
    image: "/products/conitos-salvatore.png",
    unit: "caja surtida",
  },
];

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

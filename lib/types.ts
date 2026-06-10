export type ProductCategory = "alfajores" | "conitos";

export interface PackOption {
  units: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  unit: string;
  packOptions?: PackOption[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  pack?: PackOption;
}

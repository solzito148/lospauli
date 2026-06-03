export type ProductCategory = "alfajores" | "conitos";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

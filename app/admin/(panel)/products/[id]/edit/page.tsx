import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { getProductFromStore } from "@/lib/github-store";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductFromStore(id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-chocolate">Editar producto</h1>
      <ProductForm product={product} />
    </div>
  );
}

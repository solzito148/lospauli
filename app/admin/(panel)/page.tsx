import Image from "next/image";
import Link from "next/link";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { StoreStatusBanner } from "@/components/admin/StoreStatusBanner";
import { formatPrice } from "@/lib/format";
import { getProducts } from "@/lib/products";

export default async function AdminDashboardPage() {
  const products = await getProducts();

  return (
    <div>
      <StoreStatusBanner />
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-chocolate">Productos</h1>
          <p className="mt-1 text-sm text-cacao/80">{products.length} productos en el catálogo</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-full bg-chocolate px-5 py-2.5 text-sm font-medium text-blanco transition-opacity hover:opacity-90"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-dulce/30 bg-blanco shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b border-dulce/20 bg-crema/50 text-left text-cacao">
              <tr>
                <th className="px-4 py-3 font-medium">Foto</th>
                <th className="px-4 py-3 font-medium">Producto</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Precio</th>
                <th className="px-4 py-3 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-cacao/80">
                    Todavía no hay productos. Creá el primero con el botón de arriba.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                <tr key={product.id} className="border-b border-dulce/10 last:border-0">
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-lg bg-crema">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                        sizes="56px"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-chocolate">{product.name}</p>
                    <p className="mt-1 max-w-xs truncate text-xs text-cacao/70">{product.description}</p>
                  </td>
                  <td className="px-4 py-3 capitalize text-cacao">{product.category}</td>
                  <td className="px-4 py-3 font-medium text-chocolate">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-sm font-medium text-cacao underline transition-colors hover:text-chocolate"
                      >
                        Editar
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTransition } from "react";
import { deleteProductAction } from "@/app/admin/actions";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(`¿Eliminar "${productName}"?`)) {
          return;
        }

        startTransition(async () => {
          const formData = new FormData();
          formData.set("id", productId);
          await deleteProductAction(formData);
        });
      }}
      className="text-sm text-red-700 underline transition-colors hover:text-red-900 disabled:opacity-60"
    >
      {pending ? "Eliminando..." : "Eliminar"}
    </button>
  );
}

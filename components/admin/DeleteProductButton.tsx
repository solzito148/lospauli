"use client";

import { useState, useTransition } from "react";
import { deleteProductAction } from "@/app/admin/actions";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          if (!confirm(`¿Eliminar "${productName}"?`)) {
            return;
          }

          setError("");
          startTransition(async () => {
            const formData = new FormData();
            formData.set("id", productId);
            const result = await deleteProductAction(formData);
            if (result?.error) {
              setError(result.error);
            }
          });
        }}
        className="text-sm text-red-700 underline transition-colors hover:text-red-900 disabled:opacity-60"
      >
        {pending ? "Eliminando..." : "Eliminar"}
      </button>
      {error && <p className="text-xs text-red-700">{error}</p>}
    </div>
  );
}

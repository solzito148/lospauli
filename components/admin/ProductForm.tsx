"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import type { Product } from "@/lib/types";
import { createProductAction, updateProductAction } from "@/app/admin/actions";

interface ProductFormProps {
  product?: Product;
}

interface PackRow {
  key: number;
  units: string;
  price: string;
}

const initialState = { error: "" };

export function ProductForm({ product }: ProductFormProps) {
  const isEditing = Boolean(product);
  const action = isEditing ? updateProductAction : createProductAction;
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await action(formData);
      return result ?? initialState;
    },
    initialState,
  );

  const [packRows, setPackRows] = useState<PackRow[]>(
    (product?.packOptions ?? []).map((option, index) => ({
      key: index,
      units: String(option.units),
      price: String(option.price),
    })),
  );

  const addPackRow = () => {
    setPackRows((rows) => [
      ...rows,
      { key: Date.now(), units: "", price: "" },
    ]);
  };

  const removePackRow = (key: number) => {
    setPackRows((rows) => rows.filter((row) => row.key !== key));
  };

  const updatePackRow = (key: number, field: "units" | "price", value: string) => {
    setPackRows((rows) =>
      rows.map((row) => (row.key === key ? { ...row, [field]: value } : row)),
    );
  };

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-dulce/30 bg-blanco p-6 shadow-sm">
      {isEditing && <input type="hidden" name="id" value={product!.id} />}

      {!isEditing && (
        <div>
          <label htmlFor="id" className="mb-1 block text-sm font-medium text-chocolate">
            Identificador (opcional)
          </label>
          <input
            id="id"
            name="id"
            placeholder="ej. alfajor-clasico"
            className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-sm text-chocolate outline-none focus:border-cacao"
          />
          <p className="mt-1 text-xs text-cacao/70">Si lo dejás vacío, se genera automáticamente del nombre.</p>
        </div>
      )}

      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-chocolate">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          required
          defaultValue={product?.name}
          className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-sm text-chocolate outline-none focus:border-cacao"
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium text-chocolate">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={3}
          defaultValue={product?.description}
          className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-sm text-chocolate outline-none focus:border-cacao"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="mb-1 block text-sm font-medium text-chocolate">
            Precio (ARS)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.price}
            className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-sm text-chocolate outline-none focus:border-cacao"
          />
        </div>

        <div>
          <label htmlFor="unit" className="mb-1 block text-sm font-medium text-chocolate">
            Unidad
          </label>
          <input
            id="unit"
            name="unit"
            required
            defaultValue={product?.unit ?? "unidad"}
            placeholder="unidad, 68 g, caja surtida"
            className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-sm text-chocolate outline-none focus:border-cacao"
          />
        </div>
      </div>

      <div>
        <span className="mb-1 block text-sm font-medium text-chocolate">
          Presentaciones (opcional)
        </span>
        <p className="mb-2 text-xs text-cacao/70">
          Para vender por caja o pack (ej. x6, x12), agregá cada presentación con su precio.
          El cliente las va a elegir en un desplegable. Si no agregás ninguna, se vende por unidad
          con el precio de arriba.
        </p>

        <div className="space-y-2">
          {packRows.map((row) => (
            <div key={row.key} className="flex items-center gap-2">
              <span className="text-sm text-cacao">x</span>
              <input
                type="number"
                name="packUnits"
                min={1}
                step={1}
                required
                value={row.units}
                onChange={(event) => updatePackRow(row.key, "units", event.target.value)}
                placeholder="6"
                aria-label="Cantidad de unidades"
                className="w-20 rounded-xl border border-dulce/40 bg-crema/30 px-3 py-2 text-sm text-chocolate outline-none focus:border-cacao"
              />
              <span className="text-sm text-cacao">a $</span>
              <input
                type="number"
                name="packPrice"
                min={0}
                step={1}
                required
                value={row.price}
                onChange={(event) => updatePackRow(row.key, "price", event.target.value)}
                placeholder="4500"
                aria-label="Precio de la presentación"
                className="w-28 rounded-xl border border-dulce/40 bg-crema/30 px-3 py-2 text-sm text-chocolate outline-none focus:border-cacao"
              />
              <button
                type="button"
                onClick={() => removePackRow(row.key)}
                className="text-xs text-cacao/70 underline transition-colors hover:text-chocolate"
              >
                Quitar
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addPackRow}
          className="mt-2 rounded-full border border-cacao/40 px-4 py-1.5 text-xs font-medium text-cacao transition-colors hover:bg-crema"
        >
          + Agregar presentación
        </button>
      </div>

      <div>
        <label htmlFor="category" className="mb-1 block text-sm font-medium text-chocolate">
          Categoría
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={product?.category ?? "alfajores"}
          className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-sm text-chocolate outline-none focus:border-cacao"
        >
          <option value="alfajores">Alfajores</option>
          <option value="conitos">Conitos</option>
        </select>
      </div>

      <div>
        <label htmlFor="image" className="mb-1 block text-sm font-medium text-chocolate">
          Foto {isEditing ? "(opcional, para reemplazar)" : ""}
        </label>
        {product?.image && (
          <div className="relative mb-3 h-40 w-full max-w-xs overflow-hidden rounded-xl bg-crema">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
              sizes="320px"
            />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required={!isEditing}
          className="w-full text-sm text-cacao file:mr-3 file:rounded-full file:border-0 file:bg-chocolate file:px-4 file:py-2 file:text-sm file:font-medium file:text-blanco"
        />
        <p className="mt-1 text-xs text-cacao/70">JPG, PNG o WebP. Máximo 2 MB.</p>
      </div>

      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-chocolate px-6 py-2.5 text-sm font-medium text-blanco transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear producto"}
        </button>
        <a
          href="/admin"
          className="rounded-full border border-cacao/40 px-6 py-2.5 text-sm font-medium text-cacao transition-colors hover:bg-crema"
        >
          Cancelar
        </a>
      </div>
    </form>
  );
}

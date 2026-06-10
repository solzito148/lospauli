"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

const initialState = { error: "" };

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: typeof initialState, formData: FormData) => {
      const result = await loginAction(formData);
      return result ?? initialState;
    },
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 rounded-2xl border border-dulce/30 bg-blanco p-6 shadow-sm">
      {redirectTo && <input type="hidden" name="redirectTo" value={redirectTo} />}

      <div>
        <label htmlFor="username" className="mb-1 block text-sm font-medium text-chocolate">
          Usuario
        </label>
        <input
          id="username"
          name="username"
          required
          autoComplete="username"
          className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-base text-chocolate outline-none focus:border-cacao sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm font-medium text-chocolate">
          Clave
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-dulce/40 bg-crema/30 px-4 py-2.5 text-base text-chocolate outline-none focus:border-cacao sm:text-sm"
        />
      </div>

      {state.error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-blanco transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}

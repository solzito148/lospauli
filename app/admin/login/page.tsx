import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

interface AdminLoginPageProps {
  searchParams: Promise<{ from?: string }>;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { from } = await searchParams;

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl text-chocolate">Ingreso admin</h1>
        <p className="mt-2 text-sm text-cacao/80">
          Gestioná fotos, descripciones y precios de los productos.
        </p>
      </div>
      <LoginForm redirectTo={from} />
    </div>
  );
}

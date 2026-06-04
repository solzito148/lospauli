import { LoginForm } from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="font-serif text-3xl text-chocolate">Ingreso admin</h1>
        <p className="mt-2 text-sm text-cacao/80">
          Gestioná fotos, descripciones y precios de los productos.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}

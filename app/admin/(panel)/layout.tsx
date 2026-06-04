import type { Metadata } from "next";
import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin — SALVATORE",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-dulce/30 bg-blanco">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin" className="font-serif text-xl font-semibold">
            SALVATORE Admin
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-cacao transition-colors hover:text-chocolate">
              Ver sitio
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="text-cacao transition-colors hover:text-chocolate">
                Salir
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </>
  );
}

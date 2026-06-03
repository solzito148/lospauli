"use client";

import { useState } from "react";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

const navLinks = [
  { href: "#alfajores", label: "Alfajores" },
  { href: "#conitos", label: "Conitos" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dulce/30 bg-blanco/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <a href="#" className="font-serif text-2xl font-semibold tracking-wide text-chocolate">
          SALVATORE
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cacao transition-colors hover:text-chocolate"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-whatsapp px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Pedir por WhatsApp
          </a>

          <button
            type="button"
            className="inline-flex flex-col gap-1.5 p-2 md:hidden"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block h-0.5 w-6 bg-chocolate transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-chocolate transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-chocolate transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-dulce/30 bg-blanco px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-cacao"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center rounded-full bg-whatsapp px-4 py-3 text-sm font-medium text-white"
            >
              Pedir por WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

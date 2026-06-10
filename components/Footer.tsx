import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-dulce/30 bg-chocolate py-12 text-blanco">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-serif text-2xl">SALVATORE</p>
            <p className="mt-3 text-sm leading-relaxed text-blanco/70">
              Alfajores y conitos artesanales. Tradición y sabor en cada bocado.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-dulce">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm text-blanco/80">
              <li>
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blanco"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider text-dulce">Horarios</h3>
            <p className="mt-4 text-sm text-blanco/80">
              Lunes a sábado
              <br />
              10:00 — 19:00 hs
            </p>
          </div>
        </div>

        <div className="mt-10 flex justify-center border-t border-blanco/10 pt-8 text-xs text-blanco/50">
          <a
            href="https://www.argentina.gob.ar/produccion/defensadelconsumidor"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blanco/80"
          >
            Defensa al consumidor
          </a>
        </div>

        <div className="mt-6 border-t border-blanco/10 pt-6 text-center text-xs text-blanco/50">
          <a
            href="https://pistaqio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-blanco/80"
          >
            Creado por pistaqio.com
          </a>
        </div>
      </div>
    </footer>
  );
}

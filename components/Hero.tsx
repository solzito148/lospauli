import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-crema">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit rounded-full border border-dulce/50 bg-blanco px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cacao">
            Pedidos por WhatsApp · Envíos a consultar
          </span>

          <h1 className="font-serif text-4xl leading-tight text-chocolate sm:text-5xl lg:text-6xl">
            Alfajores y conitos hechos con dedicación
          </h1>

          <p className="max-w-lg text-lg leading-relaxed text-cacao/90">
            Elaboración artesanal con ingredientes seleccionados. El sabor clásico
            argentino, listo para compartir o regalar.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#alfajores"
              className="rounded-full bg-chocolate px-6 py-3 text-sm font-medium text-blanco transition-opacity hover:opacity-90"
            >
              Ver alfajores
            </a>
            <a
              href="#conitos"
              className="rounded-full border border-chocolate px-6 py-3 text-sm font-medium text-chocolate transition-colors hover:bg-chocolate hover:text-blanco"
            >
              Ver conitos
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-dulce/40 to-cacao/20 shadow-lg">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
              <div className="flex gap-4">
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-blanco/80 shadow-md">
                  <span className="text-4xl">🍫</span>
                  <span className="mt-2 text-xs font-medium text-cacao">Alfajores</span>
                </div>
                <div className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-blanco/80 shadow-md">
                  <span className="text-4xl">🍦</span>
                  <span className="mt-2 text-xs font-medium text-cacao">Conitos</span>
                </div>
              </div>
              <p className="font-serif text-xl text-chocolate">SALVATORE</p>
              <p className="text-sm text-cacao">Reemplazá esta imagen con fotos reales de producto</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-dulce/20 bg-blanco py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-6 px-4 text-sm text-cacao sm:px-6">
          <span>✦ Ingredientes seleccionados</span>
          <span className="hidden sm:inline">·</span>
          <span>✦ Elaboración artesanal</span>
          <span className="hidden sm:inline">·</span>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-chocolate underline-offset-4 hover:underline"
          >
            Consultá por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

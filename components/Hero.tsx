import Image from "next/image";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[85vh] lg:min-h-[90vh]">
        <Image
          src="/hero-salvatore.png"
          alt="Alfajores SALVATORE artesanales con dulce de leche y chocolate"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/85 via-chocolate/60 to-chocolate/30" />

        <div className="relative mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:min-h-[90vh] lg:py-24">
          <div className="max-w-xl">
            <span className="inline-flex w-fit rounded-full border border-blanco/30 bg-blanco/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-blanco backdrop-blur-sm">
              Pedidos por WhatsApp · Envíos a consultar
            </span>

            <h1 className="mt-6 font-serif text-4xl leading-tight text-blanco sm:text-5xl lg:text-6xl">
              Alfajores y conitos hechos con dedicación
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-blanco/85">
              Elaboración artesanal con ingredientes seleccionados. El sabor clásico
              argentino, listo para compartir o regalar.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#alfajores"
                className="rounded-full bg-blanco px-6 py-3 text-sm font-medium text-chocolate transition-opacity hover:opacity-90"
              >
                Ver alfajores
              </a>
              <a
                href="#conitos"
                className="rounded-full border border-blanco/60 px-6 py-3 text-sm font-medium text-blanco transition-colors hover:bg-blanco/10"
              >
                Ver conitos
              </a>
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

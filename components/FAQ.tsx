"use client";

import { useState } from "react";

const faqs = [
  {
    question: "¿Hacen envíos?",
    answer:
      "Sí, coordinamos envíos según tu zona. Escribinos por WhatsApp con tu dirección y te confirmamos disponibilidad, costo y plazos.",
  },
  {
    question: "¿Cuáles son los medios de pago?",
    answer:
      "Aceptamos transferencia bancaria, Mercado Pago y efectivo en retiro. Te indicamos las opciones al confirmar tu pedido.",
  },
  {
    question: "¿Hay pedido mínimo?",
    answer:
      "No hay pedido mínimo. Si querés que te enviemos tu pedido, luego de enviarlo por WhatsApp coordinamos la entrega.",
  },
  {
    question: "¿Cuánto duran los productos?",
    answer:
      "Los alfajores y conitos tienen una vida útil de aproximadamente 30 días conservados en lugar fresco y seco. La fecha exacta figura en cada producto.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-crema py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-chocolate sm:text-4xl">Preguntas frecuentes</h2>
          <p className="mt-3 text-cacao/80">
            ¿Tenés dudas? Estamos para ayudarte.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-dulce/30 bg-blanco"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-chocolate">{faq.question}</span>
                  <span className="ml-4 shrink-0 text-xl text-cacao">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="border-t border-dulce/20 px-5 py-4 text-sm leading-relaxed text-cacao/80">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

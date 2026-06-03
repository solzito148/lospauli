const steps = [
  {
    number: "1",
    title: "Elegí tus productos",
    description: "Explorá alfajores y conitos, y agregá al pedido los que más te gusten.",
  },
  {
    number: "2",
    title: "Revisá tu carrito",
    description: "Verificá cantidades y total antes de enviar tu pedido.",
  },
  {
    number: "3",
    title: "Enviá por WhatsApp",
    description: "Coordinamos entrega, horario y forma de pago directamente con vos.",
  },
];

export function HowToOrder() {
  return (
    <section className="bg-blanco py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl text-chocolate sm:text-4xl">Cómo pedir</h2>
          <p className="mt-3 text-cacao/80">Tres pasos simples para disfrutar SALVATORE</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-chocolate font-serif text-xl text-blanco">
                {step.number}
              </div>
              <h3 className="mt-4 font-serif text-xl text-chocolate">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cacao/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

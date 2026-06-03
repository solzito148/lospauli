const features = [
  {
    icon: "🌾",
    title: "Ingredientes seleccionados",
    description: "Dulce de leche, chocolate y materias primas de calidad en cada elaboración.",
  },
  {
    icon: "👐",
    title: "Elaboración artesanal",
    description: "Cada alfajor y conito se prepara con cuidado, siguiendo recetas tradicionales.",
  },
  {
    icon: "💛",
    title: "Hechos para compartir",
    description: "Ideales para regalar, compartir en familia o disfrutar en cualquier momento.",
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="bg-crema py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl text-chocolate sm:text-4xl">Hechos con cuidado</h2>
          <p className="mx-auto mt-4 max-w-2xl text-cacao/80">
            En SALVATORE creemos que los mejores momentos se disfrutan con algo rico hecho con
            dedicación. Alfajores y conitos que combinan tradición y sabor auténtico.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-dulce/30 bg-blanco p-6 text-center shadow-sm"
            >
              <span className="text-4xl" role="img" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="mt-4 font-serif text-xl text-chocolate">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cacao/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

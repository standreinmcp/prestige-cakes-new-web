const steps = [
  {
    number: "1",
    title: "Ingrediente selectate",
    description:
      "Folosim doar ingrediente de calitate superioară, verificate și provenite din surse de încredere.",
  },
  {
    number: "2",
    title: "Preparare artizanală",
    description:
      "Fiecare produs este realizat manual, cu atenție la detalii și respect pentru rețetele noastre.",
  },
  {
    number: "3",
    title: "Livrare proaspătă",
    description:
      "Produsele ajung la tine proaspete, în condiții optime de transport și ambalare.",
  },
];

export function ProcessSection() {
  return (
    <section className="bg-brand-lilac/40 py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="text-center text-3xl font-semibold text-brand-navy lg:text-4xl">
          Cum lucrăm
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-sm"
            >
              <span className="absolute -right-4 -top-4 text-8xl font-bold text-brand-lilac/80">
                {step.number}
              </span>
              <div className="relative">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy text-white text-lg">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-navy/70">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

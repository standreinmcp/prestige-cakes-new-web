import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    number: "1",
    title: "Ingrediente selectate",
    description:
      "Folosim doar ingrediente naturale, de cea mai înaltă calitate, selectate cu grijă de la furnizori certificați.",
    icon: "🌾",
    featured: false,
  },
  {
    number: "2",
    title: "Preparare artizanală",
    description:
      "Echipa noastră de cofetari experimentați lucrează zilnic în laboratorul nostru profesional, cu pasiune și precizie.",
    icon: "👨‍🍳",
    featured: true,
  },
  {
    number: "3",
    title: "Livrare proaspătă",
    description:
      "Produsele sunt livrate proaspete în aceeași zi, cu condiții optime de transport pentru păstrarea calității.",
    icon: "🚐",
    featured: false,
  },
];

export function ProcessSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#fcfcff] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeader
          badge="Procesul nostru"
          title="Cum lucrăm"
          subtitle="De la selecția ingredientelor până la livrare, fiecare pas este monitorizat cu atenție"
        />

        <div className="mt-16 grid gap-[66px] lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className={`relative h-[269px] overflow-hidden rounded-[22px] bg-white p-7 ${
                step.featured
                  ? "border border-brand-gold shadow-[0_20px_32px_rgba(0,0,0,0.22)]"
                  : "border border-border-card shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
              }`}
            >
              <span
                className={`pointer-events-none absolute right-4 top-[-20px] font-serif text-[128px] font-semibold leading-none ${
                  step.featured ? "text-brand-gold/30" : "text-brand-lilac"
                }`}
                aria-hidden
              >
                {step.number}
              </span>

              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-brand-navy text-2xl text-brand-gold">
                {step.icon}
              </div>

              <div className="mt-8 max-w-[256px]">
                <h3 className="font-serif text-[22px] font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>

              {step.featured ? (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-white via-brand-gold to-white" />
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

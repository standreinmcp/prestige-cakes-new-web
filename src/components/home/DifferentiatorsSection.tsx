const items = [
  {
    title: "Calitate superioară",
    description: "Ingrediente premium și rețete rafinate, testate în timp.",
  },
  {
    title: "Siguranță alimentară",
    description: "Standarde HACCP și procese verificate la fiecare etapă.",
  },
  {
    title: "Echipă profesionistă",
    description: "Patiseri cu experiență, pasionați de meseria lor.",
  },
  {
    title: "Comenzi personalizate",
    description: "Deserturi adaptate evenimentelor și preferințelor tale.",
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="bg-neutral-soft py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="text-center text-3xl font-semibold text-brand-navy lg:text-4xl">
          Ce ne face diferiți
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-neutral-muted bg-white p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-navy">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-1 text-sm text-brand-navy/70">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

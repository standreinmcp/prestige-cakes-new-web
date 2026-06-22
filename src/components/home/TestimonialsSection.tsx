const testimonials = [
  {
    quote:
      "Croissantele sunt incredibile — proaspete, crocante și cu gust autentic. Recomand cu încredere!",
    name: "Maria P.",
    role: "Client fidel",
    initials: "MP",
  },
  {
    quote:
      "Am comandat un cozonac pentru sărbători și a fost admirat de toți invitații. Calitate excepțională.",
    name: "Ion D.",
    role: "București",
    initials: "ID",
  },
  {
    quote:
      "Serviciul de livrare este impecabil, iar deserturile ajung mereu în stare perfectă.",
    name: "Elena S.",
    role: "Organizator evenimente",
    initials: "ES",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <h2 className="text-center text-3xl font-semibold text-brand-navy lg:text-4xl">
          Ce spun clienții noștri
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-2xl border border-neutral-muted bg-white p-8 shadow-sm"
            >
              <div className="flex gap-1 text-brand-gold" aria-label="5 stele">
                {"★★★★★"}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-brand-navy/80">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-xs font-medium text-white">
                  {item.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold text-brand-navy">
                    {item.name}
                  </p>
                  <p className="text-xs text-brand-navy/60">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

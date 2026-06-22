import { SectionHeader } from "@/components/ui/SectionHeader";
import { trustTileIconShell, trustTileShell } from "@/lib/card-surface";

const items = [
  {
    title: "Calitate superioară",
    description: "15+ ani de experiență în producția de cofetărie fină",
    icon: "🏅",
    featured: false,
  },
  {
    title: "Siguranță alimentară",
    description: "Certificate și standarde HACCP implementate complet",
    icon: "🛡️",
    featured: false,
  },
  {
    title: "Echipă profesionistă",
    description: "Cofetari calificați cu studii de specialitate",
    icon: "👥",
    featured: true,
  },
  {
    title: "Comenzi personalizate",
    description: "Cofetari calificați cu studii de specialitate",
    icon: "✨",
    featured: false,
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#fcfcff] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeader badge="De ce noi" title="Ce ne face diferiți" />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.title}
              className={`flex min-h-[122px] items-start gap-6 ${trustTileShell(item.featured)}`}
            >
              <span className={trustTileIconShell()}>{item.icon}</span>
              <div>
                <h3 className="font-serif text-[22px] font-semibold text-brand-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
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

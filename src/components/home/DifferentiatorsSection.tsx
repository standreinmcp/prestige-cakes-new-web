import {
  MedalIcon,
  ShieldIcon,
  SparkleIcon,
  TeamIcon,
} from "@/components/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  cardShadowGutter,
  trustTileIconShell,
  trustTileShell,
} from "@/lib/card-surface";
import type { ReactNode } from "react";

const items: {
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    title: "Calitate superioară",
    description: "15+ ani de experiență în producția de cofetărie fină",
    icon: <MedalIcon className="text-brand-gold" />,
  },
  {
    title: "Siguranță alimentară",
    description: "Certificate și standarde HACCP implementate complet",
    icon: <ShieldIcon className="text-brand-gold" />,
  },
  {
    title: "Echipă profesionistă",
    description: "Cofetari calificați cu studii de specialitate",
    icon: <TeamIcon className="text-brand-gold" />,
  },
  {
    title: "Comenzi personalizate",
    description: "Torturi și deserturi create după preferințele tale",
    icon: <SparkleIcon className="text-brand-gold" />,
  },
];

export function DifferentiatorsSection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#fcfcff] py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <SectionHeader badge="De ce noi" title="Ce ne face diferiți" />

        <div className="mt-16 flex flex-col items-center gap-2 py-2 lg:grid lg:grid-cols-2 lg:gap-4 lg:py-2">
          {items.map((item) => (
            <div key={item.title} className={`w-full max-w-[326px] lg:max-w-none ${cardShadowGutter()}`}>
            <article
              className={`flex min-h-[214px] w-full flex-col items-center gap-4 p-6 text-center lg:flex-row lg:items-start lg:gap-6 lg:p-7 lg:text-left ${trustTileShell()}`}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

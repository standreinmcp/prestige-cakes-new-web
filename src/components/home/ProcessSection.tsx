import {
  ChefHatIcon,
  VanIcon,
  WheatIcon,
} from "@/components/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  cardGoldAccent,
  interactiveCardShell,
  processStepNumber,
} from "@/lib/card-surface";
import type { ReactNode } from "react";

const steps: {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    number: "1",
    title: "Ingrediente selectate",
    description:
      "Folosim doar ingrediente naturale, de cea mai înaltă calitate, selectate cu grijă de la furnizori certificați.",
    icon: <WheatIcon className="text-brand-gold" />,
  },
  {
    number: "2",
    title: "Preparare artizanală",
    description:
      "Echipa noastră de cofetari experimentați lucrează zilnic în laboratorul nostru profesional, cu pasiune și precizie.",
    icon: <ChefHatIcon className="text-brand-gold" />,
  },
  {
    number: "3",
    title: "Livrare proaspătă",
    description:
      "Produsele sunt livrate proaspete în aceeași zi, cu condiții optime de transport pentru păstrarea calității.",
    icon: <VanIcon className="text-brand-gold" />,
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

        <div className="mx-auto mt-16 grid max-w-[1062px] gap-[66px] lg:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className={`group relative mx-auto flex h-[269px] w-full max-w-[310px] flex-col p-7 ${interactiveCardShell()}`}
            >
              <span className={processStepNumber()} aria-hidden>
                {step.number}
              </span>

              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-brand-navy">
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

              <div
                className={`absolute inset-x-0 bottom-0 ${cardGoldAccent()}`}
                aria-hidden
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

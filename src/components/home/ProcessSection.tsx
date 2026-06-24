import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  cardGoldAccent,
  cardShadowGutter,
  interactiveCardShell,
  processStepNumber,
} from "@/lib/card-surface";

const steps = [
  {
    number: "1",
    title: "Ingrediente selectate",
    description:
      "Folosim doar ingrediente naturale, de cea mai înaltă calitate, selectate cu grijă de la furnizori certificați.",
    icon: "/icons/process/wheat.svg",
  },
  {
    number: "2",
    title: "Preparare artizanală",
    description:
      "Echipa noastră de cofetari experimentați lucrează zilnic în laboratorul nostru profesional, cu pasiune și precizie.",
    icon: "/icons/process/chef-hat.svg",
  },
  {
    number: "3",
    title: "Livrare proaspătă",
    description:
      "Produsele sunt livrate proaspete în aceeași zi, cu condiții optime de transport pentru păstrarea calității.",
    icon: "/icons/process/van.svg",
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

        <div className="mx-auto mt-16 grid max-w-[1062px] gap-[34px] py-2 lg:grid-cols-3 lg:gap-[66px]">
          {steps.map((step) => (
            <div key={step.number} className={`mx-auto w-full max-w-[310px] ${cardShadowGutter()}`}>
            <article
              className={`group relative flex min-h-[269px] w-full flex-col p-7 ${interactiveCardShell()}`}
            >
              <span className={processStepNumber()} aria-hidden>
                {step.number}
              </span>

              <div className="flex h-[70px] w-[70px] items-center justify-center rounded-2xl bg-brand-navy">
                <Image
                  src={step.icon}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8"
                  aria-hidden
                />
              </div>

              <div className="mt-8 max-w-[256px]">
                <h3 className="font-serif text-[22px] font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>

              <div className={cardGoldAccent()} aria-hidden />
            </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

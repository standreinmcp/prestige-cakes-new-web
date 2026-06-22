import Image from "next/image";
import { Button } from "@/components/ui/Button";

const services = [
  "Selecții potrivite pentru diverse tipuri de evenimente",
  "Cantități adaptate numărului de invitați",
  "Posibilități variate de prezentare",
  "Ofertă personalizată la cerere",
];

export function EventsSection() {
  return (
    <section className="relative overflow-hidden bg-brand-gold">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[594px_1fr]">
        <div className="flex flex-col justify-center px-6 py-16 lg:px-[189px] lg:py-24">
          <h2 className="font-serif text-4xl font-semibold text-brand-navy">
            Deserturi pentru evenimente
          </h2>
          <p className="mt-4 text-lg font-medium text-brand-navy/80">
            Selecții elegante de prăjituri pentru momentele speciale.
          </p>
          <p className="mt-10 max-w-[435px] text-base leading-relaxed text-brand-navy/80">
            Pregătim selecții de prăjituri pentru evenimente private sau
            corporate. Fiecare eveniment este diferit, iar oferta este adaptată în
            funcție de tipul evenimentului și numărul de invitați.
          </p>
          <ul className="mt-8 space-y-3 text-base text-brand-navy/80">
            {services.map((service) => (
              <li key={service} className="flex gap-2">
                <span aria-hidden>•</span>
                <span>{service}</span>
              </li>
            ))}
          </ul>
          <Button
            variant="navy"
            href="https://wa.me/"
            className="mt-10 w-full max-w-[316px]"
          >
            Solicită oferta pe WhatsApp
          </Button>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[765px]">
          <div className="absolute inset-0 bg-brand-gold lg:left-[-120px] lg:skew-x-[-8deg]" />
          <div className="relative h-full min-h-[320px] lg:min-h-[765px]">
            <Image
              src="/images/home/categories.jpg"
              alt="Deserturi pentru evenimente"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

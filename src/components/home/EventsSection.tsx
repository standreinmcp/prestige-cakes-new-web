import { Button } from "@/components/ui/Button";

const services = [
  "Candy bar personalizat",
  "Torturi pentru nunți și botezuri",
  "Deserturi corporate",
  "Livrare la locația evenimentului",
];

export function EventsSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-brand-gold px-6 py-16 lg:px-16 lg:py-24">
          <h2 className="text-3xl font-semibold text-brand-navy lg:text-4xl">
            Deserturi pentru evenimente
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-navy/80">
            Transformăm evenimentele tale în momente memorabile cu deserturi
            personalizate, create special pentru tine și invitații tăi.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-brand-navy/80">
            {services.map((service) => (
              <li key={service} className="flex items-center gap-2">
                <span className="text-brand-navy">•</span>
                {service}
              </li>
            ))}
          </ul>
          <Button
            variant="navy"
            href="https://wa.me/"
            className="mt-8 w-full sm:w-auto"
          >
            Solicită oferta pe WhatsApp
          </Button>
        </div>

        <div
          className="min-h-[320px] bg-cover bg-center lg:min-h-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80')",
          }}
          role="img"
          aria-label="Deserturi pentru evenimente"
        />
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/Button";

export function KitchenSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
        <div>
          <span className="text-sm font-medium text-brand-gold">
            Laborator propriu
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-brand-navy lg:text-4xl">
            Unde magia prinde viață
          </h2>
          <p className="mt-6 text-base leading-relaxed text-brand-navy/70">
            Laboratorul nostru este dotat cu tehnologie profesională și respectă
            cele mai înalte standarde de siguranță alimentară. Aici, fiecare
            desert capătă formă sub privirea echipei noastre de patiseri
            experimentați.
          </p>
          <Button variant="navy" className="mt-8">
            Film de prezentare
          </Button>
        </div>

        <div
          className="min-h-[320px] rounded-2xl bg-cover bg-center lg:min-h-[400px]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80')",
          }}
          role="img"
          aria-label="Laborator Prestige Cakes"
        />
      </div>
    </section>
  );
}

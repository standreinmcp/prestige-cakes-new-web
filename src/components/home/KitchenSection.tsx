import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function KitchenSection() {
  return (
    <section className="bg-gradient-to-b from-[#fcfcff] to-white py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 lg:grid-cols-[463px_1fr] lg:gap-[122px] lg:px-12">
        <div className="order-1 relative min-h-[310px] overflow-hidden rounded-[40px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] lg:order-2 lg:min-h-[477px]">
          <Image
            src="/images/home/kitchen.jpg"
            alt="Laborator Prestige Cakes"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 477px"
          />
        </div>

        <div className="order-2 flex flex-col gap-3 lg:order-1">
          <span className="inline-flex w-fit rounded-full bg-brand-gold/30 px-[22px] py-2 text-base font-medium text-brand-gold">
            Laboratorul nostru
          </span>
          <h2 className="font-serif text-4xl font-semibold text-brand-navy">
            Unde magia
            <br />
            prinde viață
          </h2>
          <div className="mt-5 space-y-5 text-lg font-medium text-text-muted">
            <p>
              Laboratorul nostru este echipat cu tehnologie profesională de ultimă
              generație și respectă cele mai stricte standarde de igienă și
              siguranță alimentară.
            </p>
            <p>
              Aici, echipa noastră de cofetari pasionați transformă ingredientele
              premium în opere de artă culinară, zilnic, cu dedicare și precizie.
            </p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Aleea+Dobrogei+1+Baia+Mare"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="navy" className="mt-5 w-full max-w-[316px]">
              Fă-ne o vizită
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

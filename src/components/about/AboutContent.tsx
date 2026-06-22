import Image from "next/image";
import Link from "next/link";
import { PICKUP_ADDRESS, PICKUP_MAPS_URL } from "@/lib/order-constants";

const values = [
  {
    title: "Artizanal",
    description: "Fiecare produs este realizat manual, cu atenție la detalii.",
  },
  {
    title: "Ingrediente premium",
    description: "Selectăm ingrediente de calitate superioară, fără conservanți.",
  },
  {
    title: "Proaspăt zilnic",
    description: "Vitrina live se reîmprospătează în fiecare zi.",
  },
];

export function AboutContent() {
  return (
    <>
      <section className="relative h-[265px] overflow-hidden">
        <Image
          src="/images/home/kitchen.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/60" />
        <div className="relative mx-auto flex h-full max-w-[984px] flex-col justify-end px-6 pb-10">
          <h1 className="font-serif text-4xl font-semibold text-white">
            Despre Prestige Cakes
          </h1>
          <p className="mt-3 text-lg text-neutral-soft">
            Pasiune, rafinament și gust autentic din 2010.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-12">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-brand-navy">
              Povestea noastră
            </h2>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Prestige Cakes este un laborator artizanal din Baia Mare, dedicat
              deserturilor premium pentru ocazii speciale și plăceri zilnice.
              Combinăm rețete tradiționale cu tehnici moderne pentru a oferi
              produse de excepție.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-muted">
              Fie că alegi produse din vitrina live sau comenzi personalizate,
              îți comunicăm mereu disponibilitatea și termenul de livrare înainte
              de a finaliza comanda.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
            <Image
              src="/images/home/kitchen.jpg"
              alt="Laborator Prestige Cakes"
              fill
              className="object-cover"
              sizes="550px"
            />
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#fcfcff] to-white px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-center font-serif text-3xl font-semibold text-brand-navy">
            Valorile noastre
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-border-card bg-white p-6 text-center shadow-sm"
              >
                <h3 className="font-serif text-xl font-semibold text-brand-navy">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 lg:px-12">
        <div className="mx-auto max-w-[700px] text-center">
          <h2 className="font-serif text-3xl font-semibold text-brand-navy">
            Contactează-ne
          </h2>
          <p className="mt-4 text-text-muted">
            Ai întrebări despre o comandă sau vrei o ofertă personalizată?
          </p>
          <a
            href={PICKUP_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-brand-gold hover:underline"
          >
            {PICKUP_ADDRESS}
          </a>
          <p className="mt-2 text-brand-navy">
            <a href="tel:+40731531415" className="hover:underline">
              +40 731 531 415
            </a>
            {" · "}
            <a href="mailto:contact@prestigecakes.ro" className="hover:underline">
              contact@prestigecakes.ro
            </a>
          </p>
          <Link
            href="/produse-la-comanda"
            className="mt-8 inline-flex h-14 items-center rounded-full bg-brand-gold px-8 font-medium text-brand-navy hover:bg-brand-gold/90"
          >
            Vezi produse la comandă
          </Link>
        </div>
      </section>
    </>
  );
}

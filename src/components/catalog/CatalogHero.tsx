import Image from "next/image";

type CatalogHeroProps = {
  title: string;
  subtitle: string;
};

export function CatalogHero({ title, subtitle }: CatalogHeroProps) {
  return (
    <section className="relative h-[313px] overflow-hidden">
      <Image
        src="/images/home/hero.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-navy/60" />
      <div className="relative mx-auto flex h-full max-w-[984px] flex-col justify-end px-6 pb-10 pt-24 lg:px-0">
        <h1 className="font-serif text-4xl font-semibold text-white lg:text-[36px]">
          {title}
        </h1>
        <p className="mt-3 text-lg font-medium text-neutral-soft">{subtitle}</p>
      </div>
    </section>
  );
}

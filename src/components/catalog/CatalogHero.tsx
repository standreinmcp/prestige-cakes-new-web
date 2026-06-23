import Image from "next/image";

type CatalogHeroProps = {
  title: string;
  subtitle: string;
};

const collageImages = [
  "/images/home/categories/croissante.jpg",
  "/images/home/categories/tarte.jpg",
  "/images/home/categories/cozonaci.jpg",
  "/images/home/kitchen.jpg",
];

export function CatalogHero({ title, subtitle }: CatalogHeroProps) {
  return (
    <>
      <section className="relative min-h-[144px] overflow-hidden lg:hidden">
        <div className="absolute inset-0">
          <div className="grid min-h-[144px] grid-cols-2 grid-rows-2">
            {collageImages.map((src) => (
              <div key={src} className="relative min-h-[72px]">
                <Image src={src} alt="" fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>
          <div className="absolute inset-0 bg-black/70" aria-hidden />
        </div>
        <div className="relative px-7 pb-6 pt-20 text-center">
          <h1 className="sr-only">{title}</h1>
          <p className="text-lg font-medium leading-snug text-neutral-soft">{subtitle}</p>
        </div>
      </section>

      <section className="relative hidden h-[313px] overflow-hidden lg:block">
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
    </>
  );
}

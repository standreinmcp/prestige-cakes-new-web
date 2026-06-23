import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ChevronRightIcon, WavyCheckIcon } from "@/components/icons";
import { HeroCarousel } from "@/components/home/HeroCarousel";

const stats = [
  { value: "100 %", label: "Ingrediente naturale" },
  { value: "Zilnic", label: "Producție proaspătă" },
  { value: "15+", label: "Ani experientă" },
];

export function Hero() {
  return (
    <section className="relative min-h-[844px] overflow-hidden lg:min-h-[945px]">
      <HeroCarousel />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[34px]" />

      <div className="relative mx-auto flex max-w-[741px] flex-col items-center px-6 pt-24 text-center lg:px-0 lg:pt-[234px]">
        <Logo variant="light" size={124} className="mb-6 lg:hidden" />

        <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-brand-gold px-[22px] py-2 text-base text-brand-gold">
          Producem zilnic, cu pasiune
          <WavyCheckIcon className="h-6 w-6 text-brand-gold" />
        </span>

        <h1 className="font-serif text-5xl font-semibold leading-tight text-white lg:text-[64px]">
          Deserturi premium{" "}
          <span className="text-brand-gold">
            pentru momente
            <br />
            speciale
          </span>
        </h1>

        <p className="mt-8 text-[22px] font-medium text-neutral-soft">
          Produse zilnic, din ingrediente naturale, la standarde profesionale
        </p>

        <div className="mt-12 flex w-full max-w-[335px] flex-col items-stretch gap-[22px] lg:max-w-none lg:flex-row lg:flex-wrap lg:items-center lg:justify-center lg:gap-[50px]">
          <Button
            href="/vitrina-live"
            variant="primary"
            className="w-full min-w-0 lg:min-w-[204px] lg:w-[204px]"
          >
            Vezi vitrina live
            <ChevronRightIcon />
          </Button>
          <Button
            href="/produse-la-comanda"
            variant="secondary"
            className="w-full min-w-0 lg:min-w-[204px] lg:w-[204px]"
          >
            Produse la comandă
          </Button>
        </div>
      </div>

      <a
        href="#categorii"
        className="absolute bottom-36 left-1/2 z-10 flex -translate-x-1/2 animate-bounce flex-col items-center text-neutral-soft hover:text-brand-gold"
        aria-label="Descoperă categorii"
      >
        <span className="text-lg font-medium">Descoperă</span>
        <ChevronRightIcon className="h-6 w-6 rotate-90" />
      </a>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-[883px] items-center justify-center gap-0 px-6 py-10 sm:gap-[100px]">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center">
              {index > 0 ? (
                <div
                  className="mx-4 hidden h-20 w-px bg-[#686868] sm:mx-0 sm:block"
                  aria-hidden
                />
              ) : null}
              <div className="flex flex-col items-center gap-2.5 p-2.5 text-center">
                <p className="font-serif text-[32px] font-medium uppercase text-brand-gold">
                  {stat.value}
                </p>
                <p className="text-base font-medium text-neutral-soft">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

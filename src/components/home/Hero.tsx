import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { ChevronRightIcon, WavyCheckIcon } from "@/components/icons";
import { HeroCarousel } from "@/components/home/HeroCarousel";

const stats = [
  { value: "100 %", label: "Ingrediente naturale" },
  { value: "Zilnic", label: "Producție proaspătă" },
  { value: "15+", label: "Ani experientă" },
];

function StatsRow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto flex max-w-[335px] items-center justify-center ${className}`}
    >
      {stats.map((stat, index) => (
        <div key={stat.label} className="flex items-center">
          {index > 0 ? (
            <div className="mx-2 h-20 w-px bg-[#686868] lg:mx-4" aria-hidden />
          ) : null}
          <div className="flex flex-col items-center gap-2 p-2 text-center">
            <p className="font-serif text-2xl font-medium uppercase text-brand-gold lg:text-[32px]">
              {stat.value}
            </p>
            <p className="max-w-[70px] text-sm font-medium leading-tight text-neutral-soft lg:max-w-none lg:text-base">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ExploreLink({ className = "" }: { className?: string }) {
  return (
    <a
      href="#categorii"
      className={`flex animate-bounce flex-col items-center text-neutral-soft hover:text-brand-gold ${className}`}
      aria-label="Explorează categorii"
    >
      <span className="text-lg font-medium">Explorează</span>
      <ChevronRightIcon className="h-6 w-6 rotate-90" />
    </a>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[844px] overflow-hidden lg:min-h-[945px]">
      <HeroCarousel />
      <div className="absolute inset-0 bg-black/70" />

      {/* Mobile — stacked flow per Figma `2210:892` */}
      <div className="relative flex min-h-[844px] flex-col px-6 pb-8 pt-20 text-center lg:hidden">
        <Logo variant="light" size={124} className="mx-auto mb-6" />

        <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-brand-gold px-[22px] py-2 text-sm text-brand-gold">
          Producem zilnic, cu pasiune
          <WavyCheckIcon className="h-[18px] w-[18px] text-brand-gold" />
        </span>

        <h1 className="font-serif text-4xl font-semibold leading-tight text-white">
          Deserturi premium{" "}
          <span className="text-brand-gold">
            pentru momente
            <br />
            speciale
          </span>
        </h1>

        <p className="mt-6 text-lg font-medium leading-snug text-neutral-soft">
          Produse zilnic, din ingrediente naturale, la standarde profesionale
        </p>

        <div className="mx-auto mt-8 flex w-full max-w-[335px] flex-col gap-[22px]">
          <Button href="/vitrina-live" variant="primary" className="w-full">
            Vezi vitrina live
            <ChevronRightIcon />
          </Button>
          <Button href="/produse-la-comanda" variant="secondary" className="w-full">
            Produse la comandă
          </Button>
        </div>

        <StatsRow className="mt-10" />
        <ExploreLink className="mt-5" />
      </div>

      {/* Desktop */}
      <div className="relative hidden lg:block">
        <div className="relative mx-auto flex max-w-[741px] flex-col items-center px-6 pt-[234px] text-center">
          <span className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-brand-gold px-[22px] py-2 text-base text-brand-gold">
            Producem zilnic, cu pasiune
            <WavyCheckIcon className="h-6 w-6 text-brand-gold" />
          </span>

          <h1 className="font-serif text-[64px] font-semibold leading-tight text-white">
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

          <div className="mt-12 flex flex-row flex-wrap items-center justify-center gap-[50px]">
            <Button href="/vitrina-live" variant="primary" className="min-w-[204px]">
              Vezi vitrina live
              <ChevronRightIcon />
            </Button>
            <Button href="/produse-la-comanda" variant="secondary" className="min-w-[204px]">
              Produse la comandă
            </Button>
          </div>
        </div>

        <ExploreLink className="absolute bottom-36 left-1/2 z-10 -translate-x-1/2" />

        <div className="absolute inset-x-0 bottom-0">
          <StatsRow className="max-w-[883px] px-6 py-10" />
        </div>
      </div>
    </section>
  );
}

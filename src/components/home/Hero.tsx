import { Button } from "@/components/ui/Button";

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[640px] overflow-hidden lg:min-h-[720px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(0,8,81,0.85) 0%, rgba(0,8,81,0.55) 45%, rgba(0,8,81,0.25) 100%), url('https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1600&q=80')",
        }}
        role="img"
        aria-label="Deserturi artizanale Prestige Cakes"
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col justify-center px-6 pb-16 pt-32 lg:px-12 lg:pt-40">
        <span className="mb-6 inline-flex w-fit items-center rounded-full bg-brand-gold px-4 py-1.5 text-xs font-medium text-brand-navy">
          Producem zilnic, cu pasiune
        </span>

        <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white lg:text-6xl">
          Deserturi premium{" "}
          <span className="text-brand-gold">pentru momente speciale</span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90 lg:text-lg">
          Produse zilnic, din ingrediente naturale, la standarde profesionale
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/vitrina-live" variant="primary">
            Vezi vitrina
            <ArrowRightIcon />
          </Button>
          <Button href="/produse-la-comanda" variant="secondary">
            Produse la comandă
          </Button>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerQuickLinks } from "@/lib/nav-links";

const legalLinks = [
  { href: "/gdpr", label: "GDPR" },
  { href: "/cookie", label: "Cookie" },
  { href: "/termeni", label: "T&C" },
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <div className="flex flex-col items-center">
          <Logo variant="light" size={98} />
          <div className="mt-6 flex gap-4">
            {["Facebook", "Instagram", "TikTok", "WhatsApp"].map((network) => (
              <span
                key={network}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xs"
                aria-label={network}
              >
                {network[0]}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <div>
              <h3 className="text-xl font-medium">Link-uri rapide:</h3>
              <ul className="mt-5 space-y-2 text-sm">
                {footerQuickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="underline hover:text-brand-gold">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium">
                © Prestige Cakes 2026. Toate drepturile rezervate.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-neutral-muted underline">
                {legalLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Image
                  src="/images/footer/sol.png"
                  alt="SOL - Soluționarea online a litigiilor"
                  width={136}
                  height={37}
                />
                <Image
                  src="/images/footer/sal.png"
                  alt="SAL - Soluționarea alternativă a litigiilor ANPC"
                  width={136}
                  height={37}
                />
              </div>
            </div>

            <div className="lg:text-left">
              <h3 className="text-xl font-medium">Contact:</h3>
              <ul className="mt-5 space-y-5 text-sm">
                <li>
                  <a href="tel:+40747057615" className="underline hover:text-brand-gold">
                    +40 747 057 615
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contact@prestige-cakes.ro"
                    className="underline hover:text-brand-gold"
                  >
                    contact@prestige-cakes.ro
                  </a>
                </li>
                <li>
                  <span className="underline">Baia Mare, Aleea Dobrogei nr. 1</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

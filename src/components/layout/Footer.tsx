import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerQuickLinks } from "@/lib/nav-links";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-12">
        <div className="flex flex-col items-center text-center">
          <Logo variant="light" size={56} />
          <div className="mt-6 flex gap-4">
            {["Facebook", "Instagram", "TikTok"].map((network) => (
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

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-12 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold">Link-uri rapide</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-brand-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <p className="mt-4 text-sm text-white/70">
              Prestige Cakes ©2024. Toate drepturile rezervate.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link href="/anpc" className="hover:text-brand-gold">
                  ANPC
                </Link>
              </li>
              <li>
                <Link href="/sol" className="hover:text-brand-gold">
                  SOL
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>📞 +40 700 000 000</li>
              <li>✉️ contact@prestigecakes.ro</li>
              <li>📍 București, România</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-white py-4">
        <div className="mx-auto flex max-w-[1440px] justify-center gap-4 px-6 text-xs text-brand-navy/60">
          <span>Visa</span>
          <span>Mastercard</span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { CartIcon } from "@/components/icons";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { getNavLabel } from "@/lib/i18n/nav";
import { LOCALE_COOKIE, type Locale, parseLocale } from "@/lib/locale";
import { navLinks } from "@/lib/nav-links";

type MainNavProps = {
  variant?: "hero" | "default";
  initialLocale?: Locale;
};

function readLocaleFromDocument(): Locale {
  if (typeof document === "undefined") return "ro";
  const cookieMatch = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=(ro|en)(?:;|$)`),
  );
  return parseLocale(cookieMatch?.[1] ?? document.documentElement.lang);
}

export function MainNav({
  variant = "default",
  initialLocale = "ro",
}: MainNavProps) {
  const pathname = usePathname();
  const isHero = variant === "hero";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocale(readLocaleFromDocument());
  }, [initialLocale]);

  const linkClass = (href: string) => {
    const isActive = pathname === href;
    return `block px-2.5 py-2.5 font-serif text-lg font-medium transition-colors ${
      isActive
        ? "text-brand-gold"
        : isHero
          ? "text-white hover:text-brand-gold"
          : "text-brand-navy hover:text-brand-gold"
    }`;
  };

  return (
    <header
      className={
        isHero
          ? "absolute inset-x-0 top-0 z-50 backdrop-blur-[2.5px]"
          : "border-b border-border-card bg-white"
      }
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-[30px] lg:px-[94px]">
        <div className={isHero ? "hidden lg:block" : ""}>
          <Logo variant={isHero ? "light" : "dark"} size={isHero ? 83 : 52} />
        </div>

        <nav
          className="hidden items-center gap-[22px] lg:flex"
          aria-label="Navigare principală"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkClass(link.href)}
            >
              {getNavLabel(locale, link.labelKey)}
              {"live" in link && link.live ? (
                <span className="text-red-500" aria-hidden>
                  {" "}
                  ◉
                </span>
              ) : null}
            </Link>
          ))}

          <Link
            href="/cos"
            className={`relative ml-1 flex h-6 w-6 items-center justify-center ${
              isHero
                ? "text-white hover:text-brand-gold"
                : "text-brand-navy hover:text-brand-gold"
            }`}
            aria-label="Coș cumpărături"
          >
            <CartIcon />
            <span className="absolute -right-1 -top-1 h-[11px] w-[11px] rounded-full bg-brand-gold" />
          </Link>

          <LanguageSelector
            locale={locale}
            variant={variant}
            onLocaleChange={setLocale}
          />
        </nav>

        <div
          className={`flex items-center gap-2 lg:hidden ${
            isHero ? "text-white" : "text-brand-navy"
          }`}
        >
          <LanguageSelector
            locale={locale}
            variant={variant}
            onLocaleChange={setLocale}
          />
          <Link href="/cos" aria-label="Coș cumpărături">
            <CartIcon />
          </Link>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center"
            aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className="sr-only">Meniu</span>
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
              {mobileOpen ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          className={`border-t px-6 py-4 lg:hidden ${
            isHero
              ? "border-white/20 bg-black/80 text-white"
              : "border-border-card bg-white text-brand-navy"
          }`}
          aria-label="Navigare mobilă"
        >
          <div className="mb-4">
            <LanguageSelector
            locale={locale}
            variant={variant}
            onLocaleChange={setLocale}
          />
          </div>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
                onClick={() => setMobileOpen(false)}
              >
                {getNavLabel(locale, link.labelKey)}
                {"live" in link && link.live ? (
                  <span className="text-red-500" aria-hidden>
                    {" "}
                    ◉
                  </span>
                ) : null}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

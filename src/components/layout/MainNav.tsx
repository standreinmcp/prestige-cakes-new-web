"use client";

import Image from "next/image";
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

const menuBackgroundImages = [
  "/images/home/hero.jpg",
  "/images/home/categories/croissante.jpg",
  "/images/home/categories/tarte.jpg",
  "/images/home/kitchen.jpg",
];

function readLocaleFromDocument(): Locale {
  if (typeof document === "undefined") return "ro";
  const cookieMatch = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=(ro|en)(?:;|$)`),
  );
  return parseLocale(cookieMatch?.[1] ?? document.documentElement.lang);
}

function HamburgerIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseCircleIcon({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 16l16 16M32 16L16 32"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
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

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const desktopLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `block px-2.5 py-2.5 font-serif text-lg font-medium transition-colors ${
      isActive
        ? "text-brand-gold"
        : isHero
          ? "text-white hover:text-brand-gold"
          : "text-brand-navy hover:text-brand-gold"
    }`;
  };

  const mobileLinkClass = (href: string) => {
    const isActive = pathname === href;
    return `block px-2.5 py-2.5 font-serif text-[28px] leading-[37px] font-medium transition-colors ${
      isActive ? "text-brand-gold" : "text-white hover:text-brand-gold"
    }`;
  };

  return (
    <>
      <header
        className={
          isHero
            ? "absolute inset-x-0 top-0 z-50 bg-black/10 backdrop-blur-[2.5px] lg:bg-transparent"
            : "relative z-50 border-b border-border-card bg-white"
        }
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center px-4 lg:justify-between lg:px-[94px] ${
            isHero ? "h-16 justify-end lg:h-auto lg:py-[30px]" : "justify-between py-4 lg:py-[30px]"
          }`}
        >
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
                className={desktopLinkClass(link.href)}
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

          <button
            type="button"
            className={`flex h-12 w-12 items-center justify-center lg:hidden ${
              isHero ? "text-white" : "text-brand-navy"
            }`}
            aria-label={mobileOpen ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <HamburgerIcon />
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Meniu navigare"
        >
          <div className="absolute inset-0">
            {isHero ? (
              <div className="grid h-full w-full grid-cols-2 grid-rows-2">
                {menuBackgroundImages.map((src) => (
                  <div key={src} className="relative">
                    <Image src={src} alt="" fill className="object-cover" sizes="50vw" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full w-full bg-brand-navy" />
            )}
            <div className="absolute inset-0 bg-black/70" aria-hidden />
          </div>

          <div className="relative flex h-16 shrink-0 items-center justify-end px-4">
            <button
              type="button"
              className="flex h-12 w-12 items-center justify-center text-white"
              aria-label="Închide meniul"
              onClick={() => setMobileOpen(false)}
            >
              <CloseCircleIcon />
            </button>
          </div>

          <nav
            className="relative flex flex-1 flex-col px-5 pb-8"
            aria-label="Navigare mobilă"
          >
            <div className="flex flex-col gap-[22px]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={mobileLinkClass(link.href)}
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

              <Link
                href="/cos"
                className={`flex items-center gap-3 px-2.5 py-2.5 font-serif text-[28px] leading-[37px] font-medium transition-colors ${
                  pathname === "/cos"
                    ? "text-brand-gold"
                    : "text-white hover:text-brand-gold"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <CartIcon className="h-8 w-8 shrink-0" />
                Coș cumpărături
              </Link>
            </div>

            <div className="mt-auto flex flex-col items-start gap-8">
              <LanguageSelector
                locale={locale}
                variant="overlay"
                onLocaleChange={setLocale}
              />
              {isHero ? (
                <div className="mx-auto">
                  <Logo variant="light" size={124} />
                </div>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}

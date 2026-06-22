"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/brand/Logo";
import { CartIcon, ChevronDownIcon } from "@/components/icons";
import { navLinks } from "@/lib/nav-links";

type MainNavProps = {
  variant?: "hero" | "default";
};

export function MainNav({ variant = "default" }: MainNavProps) {
  const pathname = usePathname();
  const isHero = variant === "hero";

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
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-2.5 py-2.5 font-serif text-lg font-medium transition-colors ${
                  isActive
                    ? "text-brand-gold"
                    : isHero
                      ? "text-white hover:text-brand-gold"
                      : "text-brand-navy hover:text-brand-gold"
                }`}
              >
                {link.label}
                {"live" in link && link.live ? (
                  <span className="text-red-500" aria-hidden>
                    {" "}
                    ◉
                  </span>
                ) : null}
              </Link>
            );
          })}

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

          <button
            type="button"
            className={`flex items-center gap-3 rounded-md py-2 pl-3 pr-4 ${
              isHero ? "text-white" : "text-brand-navy"
            }`}
            aria-label="Selector limbă"
          >
            <span
              className="flex h-5 w-5 overflow-hidden rounded-full"
              aria-hidden
            >
              <span className="h-full w-1/3 bg-[#002b7f]" />
              <span className="h-full w-1/3 bg-[#fcd116]" />
              <span className="h-full w-1/3 bg-[#ce1126]" />
            </span>
            <span className="text-[19px] leading-5">Română</span>
            <ChevronDownIcon />
          </button>
        </nav>

        <div
          className={`flex items-center gap-4 lg:hidden ${
            isHero ? "text-white" : "text-brand-navy"
          }`}
        >
          <Link href="/cos" aria-label="Coș cumpărături">
            <CartIcon />
          </Link>
        </div>
      </div>
    </header>
  );
}

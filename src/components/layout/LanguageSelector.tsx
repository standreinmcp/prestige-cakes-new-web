"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import {
  LOCALE_COOKIE,
  type Locale,
  localeLabels,
  locales,
  parseLocale,
} from "@/lib/locale";

type LanguageSelectorProps = {
  locale: Locale;
  variant?: "hero" | "default";
  onLocaleChange?: (locale: Locale) => void;
};

const flagSrc: Record<Locale, string> = {
  ro: "/icons/flags/ro.svg",
  en: "/icons/flags/en.svg",
};

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
  document.documentElement.lang = locale;
}

export function LanguageSelector({
  locale: initialLocale,
  variant = "default",
  onLocaleChange,
}: LanguageSelectorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const rootRef = useRef<HTMLDivElement>(null);
  const isHero = variant === "hero";

  useEffect(() => {
    setLocale(parseLocale(initialLocale));
  }, [initialLocale]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectLocale = (next: Locale) => {
    if (next === locale) {
      setOpen(false);
      return;
    }
    setLocale(next);
    setLocaleCookie(next);
    onLocaleChange?.(next);
    setOpen(false);
    router.refresh();
  };

  const textClass = isHero ? "text-white" : "text-brand-navy";
  const activeTextClass = isHero ? "text-brand-gold" : "text-brand-gold";

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className={`flex items-center gap-3 rounded-md py-2 pl-3 pr-4 ${textClass}`}
        aria-label="Selector limbă"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
      >
        <Image
          src={flagSrc[locale]}
          alt=""
          width={20}
          height={20}
          className="h-5 w-5 rounded-full"
          aria-hidden
        />
        <span className="text-[19px] leading-5">{localeLabels[locale]}</span>
        <ChevronDownIcon
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          className={`absolute right-0 top-full z-50 mt-1 min-w-[137px] overflow-hidden rounded-md py-1 shadow-lg ${
            isHero ? "bg-black/90" : "border border-border-card bg-white"
          }`}
          role="listbox"
          aria-label="Limbi disponibile"
        >
          {locales.map((option) => {
            const isActive = option === locale;
            return (
              <li key={option} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  className={`flex w-full items-center gap-3 px-3 py-2 text-left text-[19px] leading-5 transition-colors ${
                    isActive
                      ? activeTextClass
                      : isHero
                        ? "text-white hover:text-brand-gold"
                        : "text-brand-navy hover:text-brand-gold"
                  }`}
                  onClick={() => selectLocale(option)}
                >
                  <Image
                    src={flagSrc[option]}
                    alt=""
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full"
                    aria-hidden
                  />
                  <span>{localeLabels[option]}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export const LOCALE_COOKIE = "pc-locale";

export const locales = ["ro", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  ro: "Română",
  en: "English",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ro" || value === "en";
}

export function parseLocale(value: string | undefined | null): Locale {
  return isLocale(value) ? value : "ro";
}

import type { Locale } from "@/lib/locale";

const navLabelMap = {
  ro: {
    home: "Acasă",
    vitrina: "Vitrină Live",
    madeToOrder: "Produse la comandă",
    gallery: "Galerie foto",
    about: "Despre noi",
  },
  en: {
    home: "Home",
    vitrina: "Live showcase",
    madeToOrder: "Made to order",
    gallery: "Photo gallery",
    about: "About us",
  },
} as const satisfies Record<Locale, Record<string, string>>;

export function getNavLabel(locale: Locale, key: keyof (typeof navLabelMap)["ro"]) {
  return navLabelMap[locale][key];
}

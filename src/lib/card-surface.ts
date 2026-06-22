/** Shared card chrome — Figma `2018:539` / CAT-03, `2018:571` / HOM-05 */

export function interactiveCardShell(featured = false) {
  return [
    "overflow-hidden rounded-[22px] border bg-white transition-all duration-300",
    featured
      ? "border-brand-gold shadow-[0_20px_16px_rgba(0,0,0,0.22)] group-hover:-translate-y-1 group-hover:shadow-[0_24px_20px_rgba(0,0,0,0.24)]"
      : "border-border-card shadow-[0_8px_10px_rgba(0,0,0,0.12)] group-hover:-translate-y-1 group-hover:border-brand-gold group-hover:shadow-[0_20px_16px_rgba(0,0,0,0.22)]",
  ].join(" ");
}

export function cardGoldAccent(featured = false) {
  return [
    "h-1 shrink-0 bg-gradient-to-r from-white via-brand-gold to-white transition-opacity duration-300",
    featured ? "opacity-100" : "opacity-0 group-hover:opacity-100",
  ].join(" ");
}

/** Trust / differentiator tiles — Figma `2013:249` / HOM-07 */
export function trustTileShell(featured = false) {
  return [
    "group rounded-[22px] border bg-white p-6 transition-all duration-300",
    featured
      ? "border-brand-gold shadow-[0_20px_32px_rgba(0,0,0,0.22)]"
      : "border-border-card shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:border-brand-gold hover:shadow-[0_20px_32px_rgba(0,0,0,0.22)]",
  ].join(" ");
}

export function trustTileIconShell() {
  return "flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-2xl bg-icon-cream text-2xl transition-all duration-300 group-hover:scale-105 group-hover:rounded-3xl";
}

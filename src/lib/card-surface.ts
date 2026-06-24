/** Shared card chrome — Figma `2018:539` / CAT-03, `2018:571` / HOM-05 */

export function interactiveCardShell() {
  return [
    "rounded-[22px] border border-border-card bg-white",
    "shadow-[0_8px_10px_rgba(0,0,0,0.12)] transition-all duration-300",
    "group-hover:-translate-y-1 group-hover:border-brand-gold group-hover:shadow-[0_20px_16px_rgba(0,0,0,0.22)]",
  ].join(" ");
}

/** Space around cards so shadows are not clipped by scroll/grid parents */
export function cardShadowGutter() {
  return "px-2 pt-2 pb-6";
}

export function cardGoldAccent() {
  return [
    "h-1 shrink-0 bg-gradient-to-r from-white via-brand-gold to-white",
    "opacity-0 transition-opacity duration-300 group-hover:opacity-100",
  ].join(" ");
}

/** Trust / differentiator tiles — Figma `2013:249` / HOM-07 */
export function trustTileShell() {
  return [
    "group rounded-[22px] border border-border-card bg-white p-6",
    "shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300",
    "hover:border-brand-gold hover:shadow-[0_20px_32px_rgba(0,0,0,0.22)]",
  ].join(" ");
}

export function trustTileIconShell() {
  return "flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-2xl bg-icon-cream text-2xl transition-all duration-300 group-hover:scale-105 group-hover:rounded-3xl";
}

/** Large step number — gold tint only on card hover */
export function processStepNumber() {
  return "pointer-events-none absolute right-4 top-[-20px] font-serif text-[128px] font-semibold leading-none text-brand-lilac transition-colors duration-300 group-hover:text-brand-gold/30";
}

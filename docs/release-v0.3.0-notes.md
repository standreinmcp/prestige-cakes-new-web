# Release v0.3.0 — Lighthouse performance pass

## LCP and homepage

- Server-rendered `Hero` + client `HeroCarousel` (lazy slide loading)
- Font weight subsetting (Inter 400/500/600, Playfair 500/600)
- Compressed homepage JPEGs (~6 MB → ~600 KB source)

## Bundle and SSR

- `ConvexClientProvider` + `CartProvider` scoped to `(catalog)` only
- `ConvexProviders` on `(main)` and `admin` route groups
- Removed catalog `ClientOnly` wrapper; server `CatalogHero` on list pages
- `dynamic()` for checkout, gallery, and admin panels

## Config and images

- `images.remotePatterns` for Convex hosts in `next.config.ts`
- Removed `priority` from secondary-page banner images
- `sharp` devDependency for image tooling

## Card hover fix (Figma)

- Gold border/accent only on hover — removed permanent `featured` states mistaken for Figma examples

## Accessibility

- Hero scroll CTA `aria-label` aligned with visible text
- Improved gold contrast on hero stats and category links

## Audit

See `docs/lighthouse-audit-results.md` — homepage accessibility 100, TBT 10 ms (local prod build).

# Release v0.2.9 — Deploy fix + card hover states

## Vercel deploy

- Checkout prerender no longer requires `ConvexProvider` at build time
- Order creation moved to `POST /api/orders/create` (Convex HTTP client)
- `ClientOnly` wrapper defers Convex hooks on catalog, admin, and gallery pages
- `.vercel` added to `.gitignore`

## Card hover (Figma `2018:539`, `2018:571`, CAT-03 / HOM-05)

- Unified gold border, shadow lift, and bottom gold accent on hover
- Product cards (`ProductCard`), homepage category carousel, process, testimonials
- Trust tiles: gold border on hover + icon scale / radius (`2013:249`)
- Shared styles in `src/lib/card-surface.ts`

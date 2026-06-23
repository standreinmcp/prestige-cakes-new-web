# Lighthouse audit results

Audits run after performance remediation (v0.3.0 work). Mobile emulation, local production server (`npm run build && npm run start`).

## Baseline (pre-fix, production)

Source: `docs/_lighthouse-report.json` — https://prestige-cakes-new-web.vercel.app/

| Route | Performance | Accessibility | LCP | FCP | TBT |
|-------|-------------|---------------|-----|-----|-----|
| `/` | 90 | 96 | 3.5 s | 1.5 s | 60 ms |

## Post-fix (local production build)

| Route | Performance | Accessibility | LCP | FCP | TBT |
|-------|-------------|---------------|-----|-----|-----|
| `/` | 90 | **100** | 3.5 s | 1.5 s | **10 ms** |
| `/vitrina-live` | 81 | 97 | 3.4 s | 1.4 s | 10 ms |
| `/checkout` | 89 | 90 | 3.7 s | 1.5 s | 20 ms |

## Changes applied

- Hero split: server-rendered `h1` + lazy hero carousel slides
- Font weight subsetting (Inter 400/500/600, Playfair 500/600)
- Convex + Cart providers scoped to `(catalog)`; Convex on `(main)` + `admin`
- Catalog `ClientOnly` removed; `CatalogHero` server-rendered on catalog list pages
- Homepage JPEGs compressed (~6 MB → ~587 KB total source)
- `images.remotePatterns` for Convex hosts
- Removed `priority` from secondary route banner images
- `dynamic()` for checkout, gallery, admin panels
- Accessibility: hero scroll `aria-label`, gold contrast on stats, category link contrast

## Notes

- Homepage **accessibility** improved 96 → 100; **TBT** improved on `/`.
- **LCP** remains ~3.4–3.7 s on local runs; redeploy to Vercel and re-audit production to measure CDN + compressed image impact.
- `/vitrina-live` performance (81) reflects Convex client hydration on catalog routes; further gains need Convex RSC/preload patterns.

## Re-run

```bash
npm run build && npm run start -p 3010
npx lighthouse http://localhost:3010/ --only-categories=performance,accessibility --view
```

# Release v0.2.4 — Admin catalog CRUD & order status

## Summary
Full admin CRUD for products and categories (Convex mutations + forms). Order detail supports status updates including per sub-order for split orders.

## Tests
- `npm run test` — `slug.test.ts`

## Includes
- `categories.create/update/remove` with active-product guard on delete
- `products.create/update/remove` with stock rules for vitrină
- Admin list + prefilled edit forms with „Salvează schimbările”

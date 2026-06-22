# Release v0.1.9 — P0 functional core

## Summary
Cart context with localStorage, split-order logic, Convex order schema with sub-orders, checkout form persistence, and Vitest unit tests for cart/order helpers.

## Tests
- `npm run test` — `cart-types.test.ts`, `order-session.test.ts`

## Includes
- Cart provider, split-order UI at `/cos`
- Checkout → `orders.create` mutation
- PDP add-to-cart + lead-time badge
- Order confirmation via session storage

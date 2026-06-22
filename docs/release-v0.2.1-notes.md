# Release v0.2.1 — Stripe checkout stub

## Summary
Card payments route through `/api/stripe/checkout`. Without `STRIPE_SECRET_KEY`, returns mock redirect to confirmation for local testing.

## Tests
- `npm run test` — `route.test.ts`

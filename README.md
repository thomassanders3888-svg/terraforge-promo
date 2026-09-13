# terraforge-promo

Public promo site for TerraForge early-access pre-order (terraforge-us.com).

- Offer: USD $19.99 early-access pre-order
- Access window: early access early 2027
- Checkout: PayPal Buttons (no hosted button)
- No game binaries, Steam links, or downloads
- Showcase copy in `#showcase-list` is swappable when Forge Chief bullets arrive
- Optional cross-link: [LOW WATER](https://helioncompact.com/)

## Hard checkout contract

Do not change these:

- Price `19.99` USD
- PayPal Buttons client-id `AaxLRJKmKRPyCpXy0WDxCvxbg4rELMydKeT2UvrZta2l-NEbe1NWzqBaeY2LFWn6nStNbjFmIqJ4qFQK`
- SDK `currency=USD&intent=capture`
- `createOrder` description `TerraForge early access pre-order`
- Canonical `https://terraforge-us.com/`
- No hosted PayPal buttons (no N3J6 / BAAGUL)

```bash
node scripts/check-hard-constraints.mjs
```

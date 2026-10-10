# Small decisions, observable behavior

## 1. An unavailable backend should not hide the frontend

**Before:** the old storefront fetches categories, products, and billboards from an environment-defined API. It also contains fixed database IDs. The old hosted services have not been verified as available.

**Decision:** the public portfolio edition uses a small typed synthetic catalog. It keeps the catalog → product → bag flow, without copying private configuration or connecting the old admin.

**How to verify:** run without any `.env` file. Browse the catalog, open a product, and use the demo bag. This is an explicit demo architecture, not a silent fallback from failed production requests.

## 2. A label is part of a component's behavior

**Observed failure:** the first AI-assisted test run had 9 passing tests and one failure. The empty-state button was visually labeled Clear filters, but its accessible name included a decorative arrow.

**Fix:** keep the arrow in a separate `aria-hidden` span. The test finds the button by its intended accessible name and clicks it to confirm the full catalog returns.

**How to verify:** `npm test`, then keyboard-navigate to Clear filters after searching for a nonexistent product.

**Attribution:** automated checks caught this during AI-assisted preparation. The owner has not claimed independent discovery.

## 3. A local cart is not a trusted checkout

**Risk:** localStorage can be changed by the visitor or contain old/corrupt data.

**Decision:** persist only IDs and integer quantities. Ignore unknown products and duplicates, cap stock, and always resolve prices from the synthetic catalog. Store money as integer satang.

**How to verify:** the cart tests restore malformed data, forged prices, duplicate lines, and invalid quantities. E2E changes quantity, reloads the page, and checks the total.

**Limit:** all of this is frontend behavior. Real commerce still needs server-authoritative stock and price checks inside a transaction, plus payment verification.

## 4. Make the public boundary explicit

**Before:** the old storefront includes Google-sourced images, a company address, and a Shopee link labeled Add To Cart.

**Decision:** prepare a separate repository with new demo-only code and SVG illustrations. Do not copy `.env`, old images, company text, affiliate links, or the old Git history. The original folders are preserved.

**How to verify:** inspect the new repository's tracked file list and run Gitleaks over all of its history before pushing. The old public repository still needs a separate review; this new edition does not erase anything already published there.

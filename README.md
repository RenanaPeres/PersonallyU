# PersonallyU

**PersonallyU** is a Shopify storefront that sells personality-matched merchandise. Customers take a short psychometric quiz, receive a personality type, and are routed to a curated product collection featuring designs made specifically for them — and for their personality's counterpart.

The store is built on the Shopify **Craft** theme (v15.2.0) as a foundation. The theme's auto-generated Liquid, CSS, and JS handle standard e-commerce functionality. The custom layer — the personality engine — lives in two files: `assets/personalization.js` and `assets/cart.js`.

---

## Personality System

### The Quiz & Personality Types

Users complete a quiz hosted on QuestionPro. Upon completion, they are redirected back to the store with two URL parameters:

```
/collections/products/{PERSONALITY}?response_id=abc123&set={PERSONALITY}
```

The personality system is based on five Big Five personality axes, each with two poles:

| Code | Trait |
|------|-------|
| `EX` | Extraverted |
| `IN` | Introverted |
| `SY` | Sympathetic |
| `CR` | Critical |
| `MS` | Mentally Stable |
| `AN` | Anxious |
| `SD` | Self-Disciplined |
| `CL` | Careless |
| `OM` | Open-Minded |
| `CM` | Closed-Minded |
| `AMB` | Ambiguous (balanced across axes) |
| `NO` | No result (default fallback) |

Each type has an **anti-personality** — its direct opposite on the same axis — defined in `personalization.js`:

```js
const AntiPersonality = {
  IN: "EX",  EX: "IN",
  SY: "CR",  CR: "SY",
  MS: "AN",  AN: "MS",
  SD: "CL",  CL: "SD",
  CM: "OM",  OM: "CM",
};
```

### localStorage State

All personality state is persisted in `localStorage` and read on every page load:

| Key | Value |
|-----|-------|
| `userQuizData` | `{ personality: "EX", responseId: "abc123" }` |
| `currentClickedPersonality` | `"ownPersonality"` \| `"antiPersonality"` \| `"neutral"` \| `"noPersonality"` |
| `AddtoCartPersonality` | Snapshot of `currentClickedPersonality` at the moment of Add to Cart |
| `productType` | Last detected product type from URL (`"hat"`, `"shirt"`, etc.) |
| `productVariantMap` | Enriched cart map (see Cart section) |
| `parsedCartState` | Raw Shopify `/cart.js` response |

---

## `assets/personalization.js` — The Core Custom File

This file is an IIFE that runs on every page. It is responsible for four distinct behaviors:

### 1. Product Variant Label Replacement

On product pages, Shopify renders variant selectors as radio inputs. By default these show text labels like "Design 2". PersonallyU replaces those labels with personality animal images.

Each user sees **9 variant images** — 3 personality slots (own, anti, AMB) × 3 animal mascots (armadillo, bear, badger):

```js
const personalityToDesignImages = {
  EX: ["EX", "IN", "AMB"],   // own, anti, AMB
  IN: ["IN", "EX", "AMB"],
  // ...
};
```

The `updateLabels()` function queries `label[for="template--{sectionId}__main-{index}"]` elements and injects `<img>` tags with the correct CDN URLs. It runs on `DOMContentLoaded` and again via a `MutationObserver` that watches the variant wrapper element — because Shopify re-renders the variant selectors when navigating between variants, which would reset the labels.

> **Note:** The label `for` attribute IDs are hardcoded to specific Shopify section template IDs (e.g., `template--17814043295926__main`). If the Shopify section is ever deleted and re-created, these IDs will change and must be updated here.

### 2. URL Param → localStorage Sync

```
⚠️ The block marked "DO NOT TOUCH" must not be modified.
```

When the user arrives from the quiz, `personalization.js` reads `response_id` and `set` from the URL and writes them to `localStorage.userQuizData`. On subsequent visits (no URL params), it reads from localStorage and redirects the user to their personality collection:

```
/collections/products/{PERSONALITY}?response_id=...&personality=...
```

This ensures that once a user has taken the quiz, they are always served their personalised collection — even if they come back days later from a bookmark or email link.

### 3. Click Tracking per Variant

When a user clicks a variant label, `personalization.js` reads the `img.about` attribute (which stores the personality code set during label injection) and classifies the choice:

```js
function getPersonalityType(chosedPersonality) {
  if (chosedPersonality === "noPersonality") return "noPersonality";
  if (chosedPersonality === personality)              return "ownPersonality";
  if (chosedPersonality === AntiPersonality[personality]) return "antiPersonality";
  return "neutral";
}
```

The result (`"ownPersonality"`, `"antiPersonality"`, `"neutral"`, or `"noPersonality"`) is stored in `localStorage.currentClickedPersonality`. When the Add to Cart button is clicked, this value is snapshotted into `localStorage.AddtoCartPersonality`.

### 4. Navigation Redirect Intercept

Any `<a>` link pointing to `personallyu.com` or `/collections/customer` is intercepted by a jQuery click handler. Instead of following the raw href, the handler reads `localStorage.userQuizData` and redirects to the personality-filtered URL:

```
/collections/products/{PERSONALITY}?response_id={ID}&set={PERSONALITY}
```

If the user has no quiz data, they are redirected to `/collections/customer` as a fallback.

---

## `assets/cartPersonality.js` — Rate-Limited Add to Cart

This file wraps the native Shopify `form[action="/cart/add"]` submit event to prevent Shopify from rate-limiting the session (HTTP 429).

**Flow:**
1. Intercepts the form submit with `event.preventDefault()`
2. Enforces a **3-second cooldown** between submissions and a **1.5-second lock** after each one
3. If Shopify returns a 429 with `"Too many attempts"`, sets a session-level `isBlocked` flag and alerts the user
4. On success, waits 300ms for Shopify's cart to update, then fetches `/cart.js` and calls `buildAndStoreProductVariantMap()` to keep the enriched cart map in sync

---

## `assets/cart.js` — Cart State & Analytics

This file extends the Craft theme's auto-generated `CartItems` web component with custom personality-aware logic.

### `buildAndStoreProductVariantMap(parsedCartState)`

The central data-enrichment function. It takes a raw Shopify cart state object and builds a nested map keyed by **product → animal → personality type**:

```js
{
  "EX Your Personalised Hat": {
    "armadilo": {
      "ownPersonality": [ { productName, variantTitle, size, price, animal, personality, designNumber, ... } ]
    },
    "bear": {
      "antiPersonality": [ ... ]
    }
  }
}
```

Design numbers map to animal + personality slot:

| Variant | Animal | Personality Slot |
|---------|--------|-----------------|
| design 2 | armadillo | ownPersonality |
| design 3 | armadillo | antiPersonality |
| design 4 | armadillo | Neutral |
| design 5 | bear | ownPersonality |
| design 6 | bear | antiPersonality |
| design 7 | bear | Neutral |
| design 8 | badger | ownPersonality |
| design 9 | badger | antiPersonality |
| design 10 | badger | Neutral |

This map is saved to `localStorage.productVariantMap` and used as the source of truth for GA4 events.

### Google Analytics 4 Integration

After building the map, `buildAndStoreProductVariantMap` pushes events to `window.dataLayer` (Google Tag Manager):

| Event | When |
|-------|------|
| `productVariantMap_ready` | Every time the cart map is rebuilt |
| `view_cart` | On `/cart` page load |
| `begin_checkout` | On checkout button click |

Each GA4 item carries personality metadata in the category fields:

```js
{
  item_category:  item.animal,              // e.g. "bear"
  item_category2: item.personality,         // e.g. "antiPersonality"
  item_category3: item.designNumber,        // e.g. "6"
  item_category4: currentClickedPersonality // e.g. "ownPersonality"
}
```

### Sync Triggers

`buildAndStoreProductVariantMap` is called in four places to keep the map always current:

1. `DOMContentLoaded` — initial page load
2. After every `cartPersonality.js` add-to-cart success
3. After every quantity change in the `CartItems` web component
4. Via `subscribe(PUB_SUB_EVENTS.cartUpdate, ...)` — when any part of the theme fires a cart update event

---

## Project Structure

```
layout/         Master Liquid templates (theme.liquid is the HTML root)
sections/       Modular page sections — the primary building blocks
snippets/       Reusable partials included by sections
assets/         All JS and CSS — served as static files
  personalization.js  ← Custom: personality routing + label injection
  cartPersonality.js  ← Custom: rate-limited add-to-cart
  cart.js             ← Extended: enriched cart map + GA4 events
  constants.js        ← PUB_SUB_EVENTS, ON_CHANGE_DEBOUNCE_TIMER
  pubsub.js           ← Lightweight publish/subscribe event bus
templates/      JSON configs defining which sections appear per page type
config/         Theme settings schema (settings_schema.json) and values (settings_data.json)
locales/        i18n translations — 51 languages
```

---

## Development

This is a Shopify Liquid theme — there is no build step or npm.

```bash
# Preview locally (requires Shopify CLI)
shopify theme dev

# Push to Shopify
shopify theme push
```

Changes pushed to `main` on GitHub sync automatically to the Shopify admin via the GitHub integration.

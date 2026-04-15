# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PersonallyU is a customized Shopify Liquid theme (based on Craft v15.2.0) for a personality-based merchandise store. Users take a quiz that determines their personality type, and the site routes them to personalized product pages.

## Development Workflow

This is a **Shopify Liquid theme** — there is no build step, no package.json, and no npm. There is no local dev server.

**To develop:**
- Edit files directly in this repo
- Use [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) to preview locally: `shopify theme dev`
- Push to GitHub; sync to Shopify admin via the GitHub integration

**To deploy:**
- Changes on `main` sync to the Shopify store via the GitHub ↔ Shopify admin connection

## Architecture

### Tech Stack
- **Shopify Liquid** — server-side templating for all pages
- **Vanilla JavaScript (ES6+)** + **jQuery 3.6** — loaded globally via `layout/theme.liquid`
- **Plain CSS** — component-scoped files in `assets/`
- No React, Vue, or build pipeline

### Key Directories
- `layout/` — master templates (`theme.liquid` is the root HTML shell)
- `sections/` — modular page sections (52 files), the main building blocks
- `snippets/` — reusable partials included by sections
- `assets/` — all JS and CSS files served directly
- `templates/` — JSON configs that define which sections appear on each page type
- `config/` — theme settings schema and data
- `locales/` — i18n translations for 51 languages

### Personalization System

The core custom feature. User quiz results are stored in `localStorage` under the key `userQuizData` as `{ personality: "EX", responseId: "..." }`.

**Personality type codes** (from the Big Five personality model axes):
- `EX` / `IN` — Extraverted / Introverted
- `SY` / `CR` — Sympathetic / Critical
- `MS` / `AN` — Mentally Stable / Anxious
- `SD` / `CL` — Self-Disciplined / Careless
- `OM` / `CM` — Open-Minded / Closed-Minded
- `AMB` — Ambiguous (balanced)
- `NO` — No quiz result (default/fallback)

**Key files for personalization:**
- `assets/personalization.js` — all personalization logic: URL routing, image label replacement, redirect intercept, anti-personality mapping, localStorage read/write. Contains a `// ---------------DO NOT TOUCH!!!!!!----` section that handles URL params and localStorage sync.
- `assets/cartPersonality.js` — intercepts `form[action="/cart/add"]` submits, enforces a 3-second rate limit, POSTs to Shopify's `/cart/add`, then fetches `/cart.js` to build and store a `variantMap` in localStorage.
- `assets/constants.js` — defines `PUB_SUB_EVENTS` and `ON_CHANGE_DEBOUNCE_TIMER`

**Product routing flow:**
1. User completes quiz at QuestionPro → redirected to `/collections/products/{PERSONALITY}?response_id=...&set={PERSONALITY}`
2. `personalization.js` reads URL params, stores them in `localStorage`
3. On product pages, variant selector labels are replaced with personality animal images (armadillo / bear / badger per personality type)
4. Clicking "Add to Cart" stores the chosen personality type (`ownPersonality`, `antiPersonality`, or `neutral`) in localStorage
5. Internal navigation links to `personallyu.com/collections/...` are intercepted by jQuery and redirected to the personality-specific collection URL

### Pub/Sub Event System
`assets/pubsub.js` provides a lightweight publish/subscribe system. Events are defined in `constants.js` under `PUB_SUB_EVENTS`: `cart-update`, `quantity-update`, `option-value-selection-change`, `variant-change`, `cart-error`.

### Cart Behavior
Cart mode is set to `"drawer"` in `config/settings_data.json`. Cart drawer logic is in `assets/cart-drawer.js`. The custom `cartPersonality.js` runs alongside the theme's native cart scripts.

### Google Analytics Integration
Recent commits added GA data push. Look for analytics-related code in `assets/personalization.js` and `assets/cartPersonality.js` (the `buildAndStoreProductVariantMap` function).

## Important Conventions

- **localStorage keys in use:** `userQuizData`, `variantMap`, `productType`, `currentClickedPersonality`, `AddtoCartPersonality`
- **Personality images** are hosted on Shopify CDN (`cdn.shopify.com/s/files/1/0679/4585/7206/files/`)
- Animal mascots per personality: armadillo, bear, badger — each with all personality variants
- The `AntiPersonality` map in `personalization.js` defines which personality is the "opposite" of each type; each user sees their own, their anti, and AMB designs
- Variant selector label IDs follow the pattern `template--{sectionId}__main-{index}` — hardcoded IDs in `personalization.js` are tied to specific Shopify section template IDs

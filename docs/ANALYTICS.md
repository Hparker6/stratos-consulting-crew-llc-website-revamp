# Analytics & SEO reference

Everything here is enforced in code. The event registry lives in
[`src/lib/events.ts`](../src/lib/events.ts); this file is the human-readable
version of it.

---

## 1. How it's wired

| Layer | File | Responsibility |
|---|---|---|
| Transport | `src/lib/analytics.ts` | Consent, tag loading, `track()`. The **how**. |
| Event registry | `src/lib/events.ts` | Every event name + typed helper. The **what**. |
| Auto listeners | `src/lib/autoTrack.ts` | One click listener, one scroll listener. |
| Structured data | `src/lib/schema.ts` | All JSON-LD. |
| Page metadata | `src/lib/seo.ts` + `src/hooks/usePageMeta.ts` | Title, canonical, OG, Twitter, robots. |

Components never call `track('some_string')`. They either call a typed helper
(`trackContactFormSubmit()`) or carry a `data-track` attribute. That is what
keeps event names from drifting.

### GA4 vs GTM

Set **one** of these:

- `VITE_GTM_ID=GTM-XXXXXXX` → GTM is the tag layer. GA4 is configured *inside*
  the container. `gtag.js` is **not** loaded. Every event below arrives as a
  `dataLayer` event you can trigger on.
- `VITE_GTM_ID=` (empty) → `gtag.js` loads directly with `VITE_GA4_ID` and
  events are sent via `gtag('event', …)`.

They are mutually exclusive **by design** — loading both would send every event
twice. This is asserted by the verification suite.

### Consent

No tag script is injected and no event is emitted until the visitor presses
**Allow**. Google Consent Mode v2 defaults are set to `denied` before any tag can
run. Global Privacy Control is honoured as a silent decline. Consent can be
withdrawn at any time via **Cookie settings** in the footer.

---

## 2. Event catalog

`Key` = recommend marking as a Key Event (Conversion) in GA4.

| Event | Key | Fires when | Parameters |
|---|:--:|---|---|
| `page_view` | | Every route render, including SPA navigations. | `page_path`, `page_location`, `page_title` |
| `cta_click` | ★ | A "Book a call" CTA that points at the on-site `/contact` form. | `label`, `destination`, `page_path` |
| `booking_click` | ★ | A "Book a call" CTA that opens the external scheduler. | `label`, `destination`, `link_url`, `link_domain`, `page_path` |
| `contact_form_start` | | First focus of any contact form field. Once per form. | `form_name`, `page_path` |
| `contact_form_submit` | ★ | Submission that returned **2xx**. Never fires on failure. | `form_name`, `page_path` |
| `contact_form_error` | | Submission failed (network error or non-2xx). | `form_name`, `error_message`, `page_path` |
| `nav_click` | | Any header, mobile-menu, or footer navigation link. | `label`, `link_path`, `page_path` |
| `scroll_depth` | | 25 / 50 / 75 / 100% marks. Once each, reset per navigation. | `percent_scrolled`, `page_path` |
| `outbound_click` | | External link that is **not** the scheduler. | `link_url`, `link_domain`, `page_path` |
| `email_click` | ★ | Any `mailto:` link. | `link_url`, `page_path` |
| `phone_click` | ★ | Any `tel:` link. | `link_url`, `page_path` |
| `file_download` | | Link to pdf/doc/xls/csv/ppt/zip. | `link_url`, `file_extension`, `page_path` |
| `section_view` | | A key section scrolls ~40% into view. Once per section. | `section`, `page_path` |
| `dashboard_interaction` | | Click on a sample-dashboard preview or its link. Strong intent signal. | `label`, `link_path`, `page_path` |
| `consent_granted` | | Visitor pressed "Allow". | — |

### `label` values for CTAs

`nav_book_call`, `nav_book_call_mobile`, `hero_book_call`, `hero_see_services`,
`footer_book_call`, `cta_band_book_call`, `contact_pick_a_time`,
`pricing_discovery_assessment`, `pricing_dashboard_package`,
`pricing_forecasting_project`, `pricing_monthly_retainer`.

---

## 3. The duplicate-event guarantee

There is **exactly one** document click listener on the site
(`src/lib/autoTrack.ts`). It emits **at most one event per click**, resolved by a
strict priority ladder that returns at the first match:

1. `data-track` element → that event, **stop**
2. `mailto:` → `email_click`, **stop**
3. `tel:` → `phone_click`, **stop**
4. document link → `file_download`, **stop**
5. external link → `outbound_click`

The `return` after rule 1 is load-bearing. Without it, the scheduler CTA — which
is both an annotated element *and* an external link — would report **both**
`booking_click` and `outbound_click` for a single click, inflating the conversion
count by 100%. This was a real bug in the original code.

Verified by `analytics-audit`: every tracked element is clicked and the number of
resulting `dataLayer` entries is asserted to be exactly 1.

### ⚠️ `booking_click` is a click-through, not a confirmed booking

We can only observe that someone *opened* the scheduler. Whether they completed a
booking happens on Cal.com's domain and is invisible to us. To count **actual
bookings**, either embed Cal.com (`@calcom/embed-react`, which emits a
`bookingSuccessful` event we could forward) or wire a Cal.com webhook to a
Netlify Function. Both are additive; neither is done here.

---

## 4. Structured data

Site-wide (every page, injected by `components/SiteSchema.tsx`):

- **Organization** — name, logo, contact point, `sameAs` (LinkedIn, only when configured)
- **ProfessionalService** — address, `priceRange`, `areaServed`, service `OfferCatalog`
- **WebSite**

Per page (via `usePageMeta`):

- **WebPage** — every page, describing *itself*
- **BreadcrumbList** — every subpage
- **FAQPage** — **homepage only**, generated from `src/data/faqs.ts`
- **OfferCatalog** — **/pricing only**, generated from `src/data/pricing.ts`

FAQ and pricing schema are generated from the **same arrays the components
render**, so the markup cannot advertise questions or prices the page doesn't
show. This mattered: `FAQPage` and a homepage `WebPage` were previously hardcoded
in `index.html`, whose `<head>` is copied into every prerendered page — so
`/pricing` and `/terms` were emitting FAQ markup with no FAQ, and claiming the
homepage's description.

---

## 5. Indexing

- **Canonical**: every page self-canonicalises to its clean URL, so `?utm_*` and
  `?ref=` variants collapse into one indexed page.
- **robots meta**: indexable pages get `index, follow, max-image-preview:large`.
  The 404 gets `noindex, follow`.
- **404**: `netlify.toml` serves a prerendered `/404.html` with a real **HTTP 404**.
  Previously the SPA fallback returned **HTTP 200** for every unknown URL, so
  typo'd and stale links were indexable soft-404s.
- **Legacy URLs**: `/dashboards`, `/problems`, `/problems/*` are **301**s to
  `/solutions`, server-side, so link equity transfers.
- **sitemap.xml**: generated at build (`scripts/generate-sitemap.mjs`). Add a route
  there when you add a page.

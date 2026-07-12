# Stratos Consulting Crew LLC — Website

Marketing site for Stratos Consulting Crew LLC (analytics for distributors, manufacturers, and wholesalers). React 18 + Vite + TypeScript + Tailwind, deployed on Netlify from `main`.

## Structure

```
├── index.html                  # Shell: meta, consent-mode defaults, org/FAQ JSON-LD
├── public/                     # Static assets (images, robots.txt, generated sitemap.xml)
├── scripts/generate-sitemap.mjs# Sitemap generator (runs in `npm run build`)
├── src/
│   ├── main.tsx                # Boot: analytics init + global listeners
│   ├── App.tsx                 # Routes, page-view tracking, consent banner
│   ├── lib/analytics.ts        # ★ Analytics core + configuration IDs
│   ├── lib/seo.ts              # Meta/canonical/OG + JSON-LD helpers
│   ├── hooks/                  # usePageMeta (SEO), useSectionView (view events)
│   ├── components/             # Sections, dashboard mocks, consent banner
│   ├── data/                   # problems.ts, insights.ts (content as data)
│   └── pages/                  # Home, Services, Solutions, Process, Pricing, About
└── netlify.toml                # SPA redirect, CSP, cache headers
```

`npm run dev` to develop, `npm run build` to typecheck + build, `npm run preview` to serve `dist/`.

## Analytics

All tracking lives in [`src/lib/analytics.ts`](src/lib/analytics.ts) and is **consent-gated**: nothing loads until the visitor clicks "Allow" on the cookie banner (Google Consent Mode v2 defaults to denied; Global Privacy Control browsers are auto-declined).

### Configuration — one place, no refactoring

```ts
export const ANALYTICS_CONFIG = {
  GA4_ID: 'G-R4XFZ4FJXC',   // dedicated GA4 property (live)
  GTM_ID: '',               // ← paste GTM container ID when created
  CLARITY_ID: '',           // ← paste Microsoft Clarity project ID when created
}
```

- **Today (no GTM ID):** gtag.js loads directly with the GA4 property and every custom event mirrors to GA4.
- **When you create a GTM container** (tagmanager.google.com): paste the `GTM-XXXXXXX` ID above. GTM becomes the only script; add a GA4 Configuration tag inside GTM with measurement ID `G-R4XFZ4FJXC`, plus triggers for the custom events below. Meta Pixel, LinkedIn Insight Tag, Google Ads conversions, and A/B tools are then added entirely inside GTM — zero code changes.
- **When you create a Clarity project** (clarity.microsoft.com): paste the project ID above. It loads only after consent and is notified via `clarity('consent')`.

### Custom events (all flow through the dataLayer)

| Event | Fires when | Suggested GA4 Key Event |
|---|---|---|
| `contact_form_submit` | Contact form successfully submitted | ✅ primary conversion |
| `contact_form_start` | First interaction with the form | ✅ secondary |
| `cta_click` (`label`) | Any "Book a Call" style button | ✅ secondary |
| `pricing_card_click` (`label` = tier) | Pricing card CTA | ✅ secondary |
| `email_click` / `phone_click` | mailto: / tel: links (auto-detected) | ✅ secondary |
| `nav_click` (`label`) | Header/footer navigation | — |
| `services_view` (`section`) | Services section scrolled into view | — |
| `dashboard_view` (`dashboard_id`) | A sample dashboard scrolled into view | — |
| `dashboard_interaction` (`label`) | Gallery jump chips / dashboard links | — |
| `scroll_depth` (`percent_scrolled` 25/50/75/100) | Per pageview | — |
| `outbound_click` / `file_download` | Auto-detected on any link | — |
| `page_view` | Every SPA route change | — |

New buttons are trackable without code: add `data-track="event_name"` and optional `data-track-label="..."` to any element — a global listener picks it up.

### One-time GA4 setup (in the GA4 UI)

1. Admin → Data Streams → Web → confirm **Enhanced Measurement** is ON (outbound, scroll, site search, file downloads) — but under *Page views → advanced*, **uncheck "Page changes based on browser history events"**: this SPA reports `page_view` manually on every route change, and leaving it checked would double-count.
2. Admin → Events → mark `contact_form_submit` (and optionally `cta_click`, `email_click`, `pricing_card_click`) as **Key Events**.
3. Admin → Data Settings → enable Google Signals only if desired (consent mode already restricts ad storage).

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph, and Twitter Cards: `usePageMeta` in every page component ([`src/hooks/usePageMeta.ts`](src/hooks/usePageMeta.ts)).
- JSON-LD: Organization, LocalBusiness, and FAQPage in `index.html`; BreadcrumbList per subpage; Article schema on insight articles (section currently hidden).
- `sitemap.xml` regenerates on every build from [`scripts/generate-sitemap.mjs`](scripts/generate-sitemap.mjs) — add routes there when pages ship. `robots.txt` references it.
- The Insights section is fully built but hidden from nav; set `INCLUDE_INSIGHTS = true` in the sitemap script and re-add its routes in `App.tsx` when publishing begins.

## Performance

- Headshot served as 800px WebP (51 KB) with JPEG fallback, lazy-loaded, explicit dimensions (no CLS).
- Google Fonts preloaded and non-render-blocking (`display=swap`).
- No third-party JS before consent; hashed assets cached immutable for 1 year via Netlify headers.

## Contact plumbing

- Every "Book a Free Call" CTA opens a prefilled email draft to `hparker6@stratosconsultingcrew.com` (configured in [`src/lib/site.ts`](src/lib/site.ts)).
- The contact form posts to Netlify Forms with client-side validation and sanitization (length caps, control-character stripping, email format check). **One-time setup:** in the Netlify dashboard, go to Forms → Notifications and add an email notification to receive submissions.

## Security notes

- Headers (netlify.toml): CSP with `object-src 'none'`, `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`; HSTS; nosniff; strict referrer policy.
- No secrets live in this repo. The GA4 measurement ID is public by design; `.env*` files are gitignored and none exist.
- `npm audit` reports a moderate esbuild advisory (GHSA-67mh-4wv8-2f99) via Vite. It affects only the **local dev server** (`npm run dev`), never the deployed static site. The fix requires a breaking Vite major upgrade; revisit when upgrading tooling.

## Deployment

Push to `main` → Netlify builds (`npm run build`) and deploys. Domain: stratosconsultingcrew.com (Google Workspace, Netlify DNS).

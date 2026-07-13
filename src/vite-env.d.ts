/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Scheduling page for the discovery call, e.g. https://cal.com/stratos/discovery */
  readonly VITE_BOOKING_URL?: string
  /** Public contact address. Falls back to the founder's address when unset. */
  readonly VITE_CONTACT_EMAIL?: string
  /** Company or founder LinkedIn URL. When unset, LinkedIn links are not rendered. */
  readonly VITE_LINKEDIN_URL?: string

  /** GA4 measurement ID (G-XXXXXXX). Used only when no GTM container is set. */
  readonly VITE_GA4_ID?: string
  /** GTM container ID (GTM-XXXXXXX). When set, GTM owns all tags and gtag.js is not loaded. */
  readonly VITE_GTM_ID?: string
  /** Microsoft Clarity project ID. Optional. */
  readonly VITE_CLARITY_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

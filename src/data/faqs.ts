/**
 * FAQ content — the single source for both the rendered accordion (FAQ.tsx) and
 * the FAQPage structured data (lib/schema.ts).
 *
 * Google requires FAQ markup to match the FAQ content visible on the page. When
 * the copy and the schema are two separate lists they drift, and drifted markup
 * is ignored at best and a manual action at worst. Sharing the array makes that
 * class of bug impossible.
 */
export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Do you work with small companies?',
    a: "Yes. That's the entire point. We focus on distributors and manufacturers with 1–50 employees who don't have an analyst on staff.",
  },
  {
    q: 'How fast should I expect results?',
    a: 'Every project is scoped so the first tangible win, usually freed-up cash from inventory or hours saved on weekly reporting, lands within the first 30–60 days. If we don’t believe your data can support that, we’ll tell you on the discovery call.',
  },
  {
    q: 'You’re a new firm. Why should I trust you?',
    a: 'Because we won’t ask you to. There are no fake logos or testimonials here; instead, every engagement is structured so trust is never required up front: a free call, then a small fixed-fee assessment whose report you keep, then fixed-scope projects you can stop after any phase. You own everything we build at every step.',
  },
  {
    q: 'What tools do you use?',
    a: 'Power BI, SQL, Python, and Excel. We meet your data where it lives, from QuickBooks to your ERP. No rip-and-replace required.',
  },
  {
    q: 'Can you work with our existing systems?',
    a: 'Almost always. We connect to your current ERP, accounting, and inventory systems instead of forcing you onto something new.',
  },
  {
    q: 'How much does the first conversation cost?',
    a: "Nothing. The discovery call is free, takes 30 minutes, and there's no obligation. We'll tell you honestly whether we can help.",
  },
]

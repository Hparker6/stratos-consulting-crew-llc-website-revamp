import { useEffect } from 'react'

const SITE = 'Stratos Consulting Crew'

/** Sets the document title + meta description for a page. */
export default function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : `${SITE} | Analytics & Dashboards for Distributors`
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (meta) meta.content = description
  }, [title, description])
}

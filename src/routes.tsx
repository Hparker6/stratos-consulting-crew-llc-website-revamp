import { useEffect, useState, type ComponentType } from 'react'

/**
 * Route-level code splitting, built to coexist with prerendering.
 *
 * Why not React.lazy + <Suspense>? Because this site ships prerendered HTML and
 * calls hydrateRoot() over it. A lazy component always suspends on its first
 * render — even if its module is already in the ESM cache — which would make
 * React throw away the prerendered markup, paint the Suspense fallback, and
 * then re-render. That would turn our best asset (fully-painted static HTML)
 * into a flash of empty screen and push LCP out.
 *
 * Instead each route is a plain component backed by a module cache:
 *
 *   - main.tsx awaits preload() for the *current* route before hydrating, so by
 *     the time React runs, Comp is already populated and renders synchronously.
 *     The hydrated tree matches the prerendered DOM exactly. No Suspense, no
 *     fallback, no flash.
 *   - Any other route is fetched on demand (or prefetched on nav hover), and
 *     shows a height-reserving placeholder for the few ms it takes to arrive.
 */

type RouteModule = { default: ComponentType }
export type RouteComponent = ComponentType & { preload: () => Promise<void> }

/** Fired once a route's code-split content is actually in the DOM. */
export const ROUTE_CONTENT_EVENT = 'stratos:route-content'

function createRoute(loader: () => Promise<RouteModule>): RouteComponent {
  let Comp: ComponentType | null = null
  let inflight: Promise<void> | null = null

  const preload = () => {
    if (Comp) return Promise.resolve()
    if (!inflight) {
      inflight = loader().then((m) => {
        Comp = m.default
      })
    }
    return inflight
  }

  function Route() {
    // Seeded from the cache, so a preloaded route renders on the first pass.
    const [, setLoaded] = useState(() => Comp !== null)

    useEffect(() => {
      if (Comp) return
      let alive = true
      preload().then(() => {
        if (alive) setLoaded(true)
      })
      return () => {
        alive = false
      }
    }, [])

    // Tell the scroll-reveal and animation-pausing observers that this route's
    // DOM now exists. On a cold navigation the chunk lands *after* the pathname
    // changed, so those observers would otherwise have scanned an empty page.
    useEffect(() => {
      if (Comp) window.dispatchEvent(new Event(ROUTE_CONTENT_EVENT))
    })

    if (Comp) return <Comp />
    // Reserves viewport height so an in-flight route chunk can't collapse the
    // page and cause a layout shift when it lands.
    return <div style={{ minHeight: '70vh' }} aria-busy="true" />
  }

  Route.preload = preload
  return Route as RouteComponent
}

export const Home = createRoute(() => import('./pages/Home'))
export const ServicesPage = createRoute(() => import('./pages/ServicesPage'))
export const SolutionsPage = createRoute(() => import('./pages/SolutionsPage'))
export const ProcessPage = createRoute(() => import('./pages/ProcessPage'))
export const PricingPage = createRoute(() => import('./pages/PricingPage'))
export const AboutPage = createRoute(() => import('./pages/AboutPage'))
export const ContactPage = createRoute(() => import('./pages/ContactPage'))
export const PrivacyPage = createRoute(() => import('./pages/PrivacyPage'))
export const TermsPage = createRoute(() => import('./pages/TermsPage'))
export const NotFoundPage = createRoute(() => import('./pages/NotFoundPage'))

/** Path → route, for preloading the entry route and prefetching on hover. */
export const routeByPath: Record<string, RouteComponent> = {
  '/': Home,
  '/services': ServicesPage,
  '/solutions': SolutionsPage,
  '/process': ProcessPage,
  '/pricing': PricingPage,
  '/about': AboutPage,
  '/contact': ContactPage,
  '/privacy': PrivacyPage,
  '/terms': TermsPage,
}

/** Warms a route's chunk ahead of navigation (called on nav link hover/focus). */
export function prefetchRoute(path: string) {
  routeByPath[path]?.preload()
}

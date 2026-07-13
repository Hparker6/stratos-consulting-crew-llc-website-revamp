import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initAnalytics } from './lib/analytics'
import { installGlobalListeners } from './lib/autoTrack'
import { routeByPath } from './routes'

initAnalytics()
installGlobalListeners()

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

const rootEl = document.getElementById('root')!
const prerenderedRoute = document.documentElement.getAttribute('data-prerendered')
const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

function boot() {
  if (prerenderedRoute === currentPath && rootEl.hasChildNodes()) {
    // Static HTML from scripts/prerender.mjs matches this route — reuse the DOM
    // so first paint isn't repainted by the client takeover. Serialization can
    // merge adjacent text nodes, so treat mismatches as recoverable (React
    // client-renders those subtrees) without console.error noise.
    hydrateRoot(rootEl, app, {
      onRecoverableError: (err) => console.debug('[hydration recovered]', err),
    })
  } else {
    // SPA-fallback-served route (redirects, 404s): discard mismatched markup.
    rootEl.innerHTML = ''
    createRoot(rootEl).render(app)
  }
}

// Resolve this route's code-split chunk BEFORE hydrating. Without this, the
// route component would render its placeholder on the first pass, React would
// find markup that doesn't match the prerendered HTML, and it would replace a
// fully-painted page with an empty box. Waiting costs nothing visually — the
// static HTML is already on screen — and guarantees a clean hydration.
const entryRoute = routeByPath[currentPath]
if (entryRoute) {
  entryRoute.preload().then(boot, boot)
} else {
  boot()
}

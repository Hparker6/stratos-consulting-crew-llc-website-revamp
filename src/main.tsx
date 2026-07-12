import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { initAnalytics, installGlobalListeners } from './lib/analytics'

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

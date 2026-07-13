import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Inline anything under 4KB as a data URI rather than paying a round trip.
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          // React + Router change far less often than our own code. Splitting
          // them out means a copy edit ships a small app chunk instead of
          // busting the whole bundle in every returning visitor's cache.
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The admin app is served under /admin on the same Vercel project as the
// storefront. It builds into the storefront's dist/admin so a single deploy
// serves both: standardgroup.ae (storefront) and standardgroup.ae/admin (admin).
export default defineConfig({
  base: '/admin/',
  plugins: [react()],
  build: {
    outDir: '../dist/admin',
    emptyOutDir: true,
  },
})
